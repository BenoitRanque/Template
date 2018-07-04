const knextlite = require('@db/knexlite')
const { ATT_WORK, ATT_EXTRA, ATT_BREAK, ATT_TIMEOFF, ATT_VACATION, ATT_HOLIDAY, ATT_LEAVE_SICK, ATT_LEAVE_PAID, ATT_LEAVE_UNPAID } = require('@tools/attType')

const format = require('date-fns/format')
const addDays = require('date-fns/add_days')
const isBefore = require('date-fns/is_before')
const isAfter = require('date-fns/is_after')
const isWithinRange = require('date-fns/is_within_range')
const isSameDay = require('date-fns/is_same_day')
const isSameMinute = require('date-fns/is_same_minute')
const differenceInCalendarDays = require('date-fns/difference_in_calendar_days')
const compareAsc = require('date-fns/compare_asc')
const compareDesc = require('date-fns/compare_desc')
const eachDay = require('date-fns/each_day')
const startOfDay = require('date-fns/start_of_day')
const endOfDay = require('date-fns/end_of_day')
// function toSqlDate (d) {
//   return `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).substr(-2, 2)}-${d.getDate()}`
// }

// module.exports = async (input, params, context) => {
//   let from = new Date()
//   from.setDate(from.getDate() - 7)
//   let to = new Date()
//   return await knextlite('att_punches')
//     .innerJoin('hr_employee', 'hr_employee.id', 'att_punches.emp_id')
//     .select(['punch_time', 'terminal_id', 'emp_pin'])
//     .where({ 'emp_pin': 513 })
//     .whereBetween('punch_time', [toSqlDate(from), toSqlDate(to)])
//     .limit(20)
//   // return await knextlite('att_punches').select().limit(20)
//   // return await knextlite.raw("SELECT name FROM sqlite_master WHERE type='table'")
// }

module.exports = async (input, { from, to, employee_id }, { model }) => {
  if ([from, to, employee_id].includes(undefined)) return 'Missing params'

  const employee = await getEmployeeWithValidShiftsExceptions(model, employee_id, from, to)
  const { shifts, exceptions, zktime_pin } = employee
  const punches = await getEmployeePunches(zktime_pin, from, to)
  const events = punches.map(({ punch_time }) => new Date(punch_time)).sort(compareAsc)
  const attendance = getAttendance(from, to, events, shifts, exceptions)



  return {
    // shifts,
    // exceptions,
    attendance,
    // punches
  }
}

function getEmployeeWithValidShiftsExceptions(model, employee_id, from, to) {
  return model.query().where({ employee_id }).eager('[shifts(onlyValidShift).slots.schedule.timetable, exceptions.slots(onlyValidException).schedule.timetable]', {
    onlyValidShift (query) {
      // filter shifts, get only ones valid for range
    },
    onlyValidException (query) {
      // filter exceptions, get only ones that are authorized and valid
      query.whereBetween('date', [format(from, 'YYYY-MM-DD'), format(to, 'YYYY-MM-DD')])
    } 
  }).first()
}

function getEmployeePunches(pin, from, to) {
  return knextlite('att_punches')
    .innerJoin('hr_employee', 'hr_employee.id', 'att_punches.emp_id')
    .select(['punch_time', 'terminal_id', 'emp_pin'])
    .where({ 'emp_pin': pin })
    .whereBetween('punch_time', [format(from, 'YYYY-MM-DD'), format(to, 'YYYY-MM-DD')])
}

// combine a date and time
function combineDateAndTime (date, time) {
  if (typeof date === 'string') date = new Date(date)
  if (typeof time === 'string') time = new Date(time)
  return new Date(date.getFullYear(), date.getMonth(), date.getDay(), time.getHours(), time.getMinutes(), time.getSeconds(), 0)
}

function getHalfpointBetweenDates(a, b) {
  if (typeof a === 'string') a = new Date(a)
  if (typeof b === 'string') b = new Date(b)
  return new Date((a.getTime() + b.getTime()) / 2)
}

function getAttendance (from, to, events, shifts, exceptions) {
  return eachDay(from, to).map(date => {
    const schedule = getScheduleForDate(date, shifts, exceptions)
    const timetable = getAttendanceTimetable(schedule, events)
    return {
      date,
      schedule,
      timetable
    }
  })
}

function getAttendanceTimetable(schedule, events) {

  schedule.timetable = schedule.timetable.sort((a, b) => {
    if (a.start_time === null) return 1
    if (b.start_time === null) return -1
    return compareAsc(a.start_time, b.start_time)
  })

  schedule.timetable.filter(timetable => timetable.type_id === ATT_BREAK).forEach(timetable => {
    let candidateEvents = events.filter(event => isWithinRange(event, timetable.start_time, timetable.end_time)).sort(compareAsc)
    
    timetable.events = candidateEvents
    timetable.start_event = timetable.start_register && candidateEvents.length > 0 ? candidateEvents[0] : null
    timetable.end_event = timetable.end_register && (candidateEvents.length > 1 || (candidateEvents.length > 0 && !timetable.start_register)) ? candidateEvents[candidateEvents.length - 1] : null    
  })
  schedule.timetable.filter(timetable => timetable.type_id === ATT_WORK).forEach(timetable => {
    let startReference = getClosestReferences(timetable.start_time, schedule)
    let endReference = getClosestReferences(timetable.end_time, schedule)
    
    let candidateStartEvents = events.filter(event => isWithinRange(event, startReference.previous, startReference.next)).sort(compareAsc)
    let candidateEndEvents = events.filter(event => isWithinRange(event, endReference.previous, endReference.next)).sort(compareDesc)
    // console.log('new reference')
    // console.log('new reference')
    // console.log('new reference')
    // console.log('new reference')
    // console.log(startReference, endReference)
    // console.log(events)
    // console.log(candidateStartEvents, candidateEndEvents)

    timetable.events = [...candidateStartEvents, ...candidateEndEvents.sort(compareAsc)]
    timetable.start_event = candidateStartEvents.length > 0 ? candidateStartEvents[0] : null
    timetable.end_event = candidateEndEvents.length > 0 ? candidateEndEvents[0] : null
  })
  schedule.timetable.filter(timetable => timetable.type_id === ATT_TIMEOFF).forEach(timetable => {

  })


  return schedule.timetable
}

function getClosestReferences (reference, schedule) {
  let candidateReferences = []

  schedule.timetable.forEach(timetable => {
    switch (timetable.type_id) {
      case ATT_BREAK:
        if (timetable.start_time !== null) candidateReferences.push(timetable.start_time)
        if (timetable.end_time !== null) candidateReferences.push(timetable.end_time)
        break
      case ATT_WORK:
        if (timetable.start_time !== null && !isSameMinute(reference, timetable.start_time)) {
          candidateReferences.push(getHalfpointBetweenDates(reference, timetable.start_time))
        }
        if (timetable.end_time !== null && !isSameMinute(reference, timetable.end_time)) {
          candidateReferences.push(getHalfpointBetweenDates(reference, timetable.end_time))
        }
        break
      case ATT_TIMEOFF:

        break
      default:
        throw new Error(`Unsuported Attendance type ${timetable.type_id}`)
    }
  })

  let previousCandidates = candidateReferences.filter(event => isBefore(event, reference)).sort(compareDesc)
  let nextCandidates = candidateReferences.filter(event => isAfter(event, reference)).sort(compareAsc)
  return {
    reference,
    previous: previousCandidates.length > 0 ? previousCandidates[0] : startOfDay(reference),
    next: nextCandidates.length > 0 ? nextCandidates[0] : endOfDay(reference)
  }
}

function getScheduleForDate(date, shifts, exceptions) {
  const shiftForDate = shifts
    .filter(shift => shift.end_date ? isWithinRange(date, shift.start_date, shift.end_date) : isAfter(date, shift.end_date))
    .sort(shift => compareAsc(shift.start_date, date))[0]

  const scheduleForDate = shiftForDate.slots[differenceInCalendarDays(date, shiftForDate.start_date) % shiftForDate.slots.length].schedule

  scheduleForDate.timetable = scheduleForDate.timetable.map(timetable => mapTimetableToExpectedDate(date, timetable))

  return scheduleForDate
}

function mapTimetableToExpectedDate(date, { type_id, timetable_name, duration, start_time, start_register, end_time, end_register }) {
  switch (type_id) {
    case ATT_WORK:
      return {
        type_id,
        timetable_name,
        duration: combineDateAndTime(date, duration),
        start_time: combineDateAndTime(date, start_time),
        start_register,
        end_time: isBefore(end_time, start_time) ? combineDateAndTime(addDays(date, 1), end_time) : combineDateAndTime(date, end_time),
        end_register
      }
    case ATT_BREAK:
      return {
        type_id,
        timetable_name,
        duration: combineDateAndTime(date, duration),
        start_time: combineDateAndTime(date, start_time),
        start_register,
        end_time: isBefore(end_time, start_time) ? combineDateAndTime(addDays(date, 1), end_time) : combineDateAndTime(date, end_time),
        end_register
      }
    case ATT_TIMEOFF:
      return {
        type_id,
        timetable_name,
        duration: combineDateAndTime(date, duration),
        start_time,
        start_register,
        end_time,
        end_register
      }
    default:
      throw new Error(`Unsuported attendance type: ${timetable.type_id}`)
  }
}
