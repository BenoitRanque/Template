const format = require('date-fns/format')
const isBefore = require('date-fns/is_before')
const isAfter = require('date-fns/is_after')
const isWithinRange = require('date-fns/is_within_range')
const isSameDay = require('date-fns/is_same_day')
const isSameMinute = require('date-fns/is_same_minute')
const differenceInCalendarDays = require('date-fns/difference_in_calendar_days')
const differenceInMinutes = require('date-fns/difference_in_minutes')
const compareAsc = require('date-fns/compare_asc')
const compareDesc = require('date-fns/compare_desc')
const max = require('date-fns/max')
const min = require('date-fns/min')
const eachDay = require('date-fns/each_day')
const startOfDay = require('date-fns/start_of_day')
const endOfDay = require('date-fns/end_of_day')
const addDays = require('date-fns/add_days')
const subDays = require('date-fns/sub_days')
const addHours = require('date-fns/add_hours')
const addMinutes = require('date-fns/add_minutes')

const gql = require('graphql-tag')

const { ZKTIME_DB_PATH } = require('./utils')

const knex = require('knex')({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: ZKTIME_DB_PATH
  }
})

module.exports = async function loadAttendanceReport({ employee, from, to }, { db }) {

  const { shifts, exceptions } = await loadEmployeeShiftsExceptionsForDateRange(db, employee.id, subDays(from, 1), to)
  const events = await loadEmployeeEventsForDateRange(employee.zkTimePin, from, to)

  const dates = getAttendanceDates(from, to, shifts, exceptions, events)

  return {
    employee,
    from,
    to,
    shifts: shifts.filter(shift => !isAfter(shift.startDate, to) && (!shift.endDate || isBefore(shift.endDate, from))),
    exceptions: exceptions.filter(exception => exception.slots.some(slot => isWithinRange(slot.date, from, to))),
    events: events.filter(event => isWithinRange(event, dates[0].innerBound, dates[dates.length - 1].outerBound)),
    dates
  }
}

async function loadEmployeeEventsForDateRange(zkTimePin, from, to) {
  const between = [format(from, 'YYYY-MM-DD'), format(addDays(to, 2), 'YYYY-MM-DD')]

  const events = await knex('att_punches')
    .innerJoin('hr_employee', 'hr_employee.id', 'att_punches.emp_id')
    .select(['punch_time']) // posssibly interesting fields: 'punch_time', 'terminal_id', 'emp_pin'
    .where({ 'emp_pin': zkTimePin })
    .whereBetween('punch_time', between)

  return events
    .map(({ punch_time }) => punch_time)
    .sort(compareAsc)
}

async function loadEmployeeShiftsExceptionsForDateRange(db, employeeID, from, to) {
  const response = await db.request(`
    query ($id: UUID! $from: DateTime! $to: DateTime!) {
      employee (where: { id: $id }) {
        shifts (where: {
          startDate_lte: $to
          OR: [
            { endDate: null },
            { endDate_gte: $from }
          ]
        }) {
          id
          startDate
          endDate
          startIndex
          slots (orderBy: index_ASC) {
            index
            schedule {
              ...AllScheduleData
            }
          }
        }
        exceptions (where: {
          autorization: {
            granted: true
          }
          slots_some: {
            date_lte: $to
            date_gte: $from
          }
        }) {
          slots (orderBy: date_ASC) {
            date
            schedule {
              ...AllScheduleData
            }
          }
        }
      }
    }

    fragment AllScheduleData on Schedule {
      id
      baseTime
      timeline {
        category
        startTime
        startRequireEvent
        endTime
        endRequireEvent
      }
      restline {
        category
        startTime
        startRequireEvent
        endTime
        endRequireEvent
        duration
      }
      offline1 {
        category
      }
      offline2 {
        category
      }
    }
  `, { id: employeeID, from, to })

  return (response && response.data && response.data.employee && response.data.employee.shifts) ? response.data.employee : {}
}

function getAttendanceDates (from, to, shifts, exceptions, events) {
  const dates = eachDay(from, to)

  const datesWithReferences = dates.map(date => ({
    date,
    ...getReferencesForDate(date, shifts, exceptions)
  }))

  const referencesForDateBeforeRange = getReferencesForDate(subDays(from, 1), shifts, exceptions)

  const datesWithReferencesBounds = getDateBounds(datesWithReferences, referencesForDateBeforeRange)

  return datesWithReferencesBounds.map(date => ({
    ...date,
    events: events.filter(event => isWithinRange(event, date.innerBound, date.outerBound))
  }))
}

function getReferencesForDate(date, shifts, exceptions) {
  const candidateExceptionsForDate = exceptions
    .filter(exception => exception && exception.slots && exception.slots.some(slot => isSameDay(slot.date, date)))
    .sort((a, b) => compareDesc(a.authorization.created_at, b.authorization.created_at))

  const exceptionForDate = candidateExceptionsForDate[0] ? candidateExceptionsForDate[0] : null

  const exceptionScheduleForDate = exceptionForDate ? exceptionForDate.slots.find(slot => isSameDay(slot.date, date)).schedule : null

  const candidateShiftsForDate = shifts
    .filter(shift => shift.endDate ? isWithinRange(date, shift.startDate, shift.endDate) : !isBefore(date, shift.startDate))
    .sort((a, b) => compareDesc(a.startDate, b.startDate))

  const shiftForDate = candidateShiftsForDate[0] ? candidateShiftsForDate[0] : null

  const shiftScheduleForDate = (shiftForDate &&  shiftForDate.slots)
    ? shiftForDate.slots[(differenceInCalendarDays(date, shiftForDate.startDate) + shiftForDate.startIndex)% shiftForDate.slots.length].schedule : null

  const scheduleForDate = exceptionScheduleForDate ? exceptionScheduleForDate : shiftScheduleForDate

  return {
    exception: exceptionForDate ? exceptionForDate : null,
    shift: shiftForDate ? shiftForDate : null,
    schedule: scheduleForDate
  }
}

function getScheduleOuterBound(schedule) {
  const MINTHRESHOLD = 6 * 60

  if (!schedule || !schedule.timeline) return 24 * 60

  return Math.max(...schedule.timeline.reduce((acc, val) => {
    acc.push(val.startTime + MINTHRESHOLD)
    acc.push(val.endTime + MINTHRESHOLD)
    return acc
  }, [24 * 60]))
}

function getDateBounds(dates, dateBefore) {
  const firstBound = getScheduleOuterBound(dateBefore.schedule)
  return dates
    .map(date => ({
      ...date,
      outerBound: getScheduleOuterBound(date.schedule)
    })).map((date, index, arr) => ({
      ...date,
      innerBound: (index === 0 ? firstBound : arr[index - 1].outerBound) - (24 * 60)
    }))
    .map(date => ({
      ...date,
      outerBound: addMinutes(date.date, date.outerBound).toISOString(),
      innerBound: addMinutes(date.date, date.innerBound).toISOString()
    }))
}

// async function loadEvents({ date, innerBound, outerBound }, zkTimePin) {
//   const between = [format(date, 'YYYY-MM-DD'), format(addDays(date, 2), 'YYYY-MM-DD')]

//   const events = await knex('att_punches')
//     .innerJoin('hr_employee', 'hr_employee.id', 'att_punches.emp_id')
//     .select(['punch_time']) // posssibly interesting fields: 'punch_time', 'terminal_id', 'emp_pin'
//     .where({ 'emp_pin': zkTimePin })
//     .whereBetween('punch_time', between)

//   return events
//     .map(({ punch_time }) => punch_time)
//     .filter(event => isWithinRange(event, innerBound, outerBound))
//     .sort(compareAsc)
// }



// async function loadDatesWithReferencessBounds(db, employeeID, from, to) {

//   const shifts = await loadEmployeeShiftsForDateRange(db, employeeID, subDays(from, 1), to)
//   const exceptions = await loadEmployeeExceptionsForDateRange(db, employeeID, subDays(from, 1), to)

//   const dates =  eachDay(from, to).map(date => ({date, employee: { id: employeeID } }))

//   const datesWithReferences = dates.map(date => ({
//     ...date,
//     ...getScheduleForDate(date.date, shifts, exceptions)
//   }))

//   const datesWithReferencesBounds = getDateBounds(datesWithReferences, getScheduleOuterBound(getScheduleForDate(subDays(from, 1), shifts, exceptions)))

//   return datesWithReferencesBounds
// }

// function getBoundsFromSchedules(current, previous, next) {
//   const currentRefs = geScheduleRefs(current)
//   const previousRefs = geScheduleRefs(previous)
//   const nextRefs = geScheduleRefs(next)


//   return { innerBound, outerBound }
// }

// function geScheduleRefs (schedule) {
//   const MINTHRESHOLD = 6 * 60 // minimum threhsold.
//   return schedule.timeline.reduce((acc, val) =>{
//     acc.push(val.startTime + MINTHRESHOLD)
//     acc.push(val.endTime + MINTHRESHOLD)
//     return acc
//   }, [0, 24 * 60])
//   .sort((a, b) => a - b)
// }


// function getDatesWithReferences(from, to, shifts, exceptions) {
//   return eachDay(from, to).map(date => {
//     const {
//       schedule,
//       shift,
//       exception
//     } = getScheduleForDate(date, shifts, exceptions)
//     return {
//       date,
//       schedule,
//       shift,
//       exception
//     }
//   })
// }

// async getEmployeeEvents (from, to) {
//   const knextlite = require('@db/knexlite')

//   const { zktime_pin } = await Employee.query().where({ employee_id: this.employee_id }).first()

//   const events = await knextlite('att_punches')
//     .innerJoin('hr_employee', 'hr_employee.id', 'att_punches.emp_id')
//     .select(['punch_time', 'terminal_id', 'emp_pin'])
//     .where({ 'emp_pin': zkTimePin })
//     .whereBetween('punch_time', [format(from, 'YYYY-MM-DD'), format(to, 'YYYY-MM-DD')])

//   return events.map(e => new Date(e.punch_time)).sort(compareAsc)
// }




