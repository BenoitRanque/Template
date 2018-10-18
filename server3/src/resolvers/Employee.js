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

const { ZKTIME_DB_PATH } = require('../utils')

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: ZKTIME_DB_PATH
  }
})

module.exports = {
  nameFull: {
    fragment: `fragment EmployeeNames on Employee { nameFirst nameMiddle namePaternal nameMaternal }`,
    resolve: ({ nameFirst, nameMiddle, namePaternal, nameMaternal }, args, ctx, info) => [nameFirst, nameMiddle, namePaternal, nameMaternal].join(' ').trim().replace(/  /, ' ')
  },
  attendance: {
    fragment: `fragment EmployeeIdzkTimePin on Employee { id zkTimePin }`, // fragment ensures requires parent object properties will be present
    resolve: async ({ id, zkTimePin }, { from, to }, ctx, info) => {
      const shifts = await loadEmployeeShiftsForDateRange(ctx.db, id, from, to)
      const exceptions = await loadEmployeeExceptionsForDateRange(ctx.db, id, from, to)
        // TODO
        // fetch exceptions (can wait)

      // map dates to  array. expand on day back en two forwards, we will use this array to determine outer and inner bounds
      const dates = eachDay(from, to).map(date => {
        const {
          schedule,
          shift,
          exception
        } = getScheduleForDate(date, shifts, exceptions)
        return {
          date,
          schedule,
          shift,
          exception
        }
      })

      return await Promise.all(eachDay(from, to).map(async date => {

        // important: needs support for 24 hours + schedules
        // todo: add dynamic value for "between": expand using outer bounds of schedule
        const between = [format(date, 'YYYY-MM-DD'), format(addDays(date, 1), 'YYYY-MM-DD')]
        const events = await knex('att_punches')
          .innerJoin('hr_employee', 'hr_employee.id', 'att_punches.emp_id')
          .select(['punch_time']) // posssibly inteeresting fields: 'punch_time', 'terminal_id', 'emp_pin'
          .where({ 'emp_pin': zkTimePin })
          .whereBetween('punch_time', between)

        return {
          date,
          shift: '',
          // exception: '',
          schedule: '',
          events: events.map(({ punch_time }) => punch_time).sort(compareAsc)
        }
      }))
    }
  }
}


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

async function loadEmployeeShiftsForDateRange(db, employeeID, from, to) {
  return []
}

async function loadEmployeeShiftsForDateRange(db, employeeID, from, to) {
  const employee = await db.request(`
    query ($id: UUID! $from: DateTime! $to: DateTime!){
      employee (where: { id: $id }) {
        shifts (where: {
          startDate_lte: $to
          NOT: {
            endDate_not: null
            endDate_lt: $from
          }
        }) {
          slots (orderBy: index_ASC) {
            index
            schedule {
              id
            }
          }
        }
      }
    }
  `, { id: employeeID, from, to })

  return employee.shifts
}

function getScheduleForDate(date, shifts, exceptions) {
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
    ? shiftForDate.slots[(differenceInCalendarDays(date, shiftForDate.startDate) +
      shiftForDate.startIndex) % shiftForDate.slots.length].schedule : null

  const scheduleForDate = exceptionScheduleForDate ? exceptionScheduleForDate : shiftScheduleForDate

  return {
    exception: exceptionForDate ? exceptionForDate : null,
    shift: shiftForDate ? shiftForDate : null,
    schedule: scheduleForDate
  }
}




