const knextlite = require('@db/knexlite')
const format = require('date-fns/format')
const addDays = require('date-fns/add_days')
const isBefore = require('date-fns/is_before')
const isAfter = require('date-fns/is_after')
const isWithinRange = require('date-fns/is_within_range')
const isSameDay = require('date-fns/is_same_day')
const differenceInCalendarDays = require('date-fns/difference_in_calendar_days')
const compareAsc = require('date-fns/compare_asc')
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




  return {
    shifts,
    exceptions,
    punches
  }
}


function getEmployeeWithValidShiftsExceptions(model, employee_id, from, to) {
  return model.query().where({ employee_id }).eager('[shifts(onlyValidShift).slots.schedule.timetable, exceptions(onlyValidException).slots.schedule.timetable]', {
    onlyValidShift (query) {
      // filter shifts, get only ones valid for range
    },
    onlyValidException (query) {
      // filter exceptions, get only ones that are authorized and valid
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
  return new Date(date.getYear(), date.getMonth(), date.getDay(), time.getHours(), time.getMinutes(), time.getSeconds(), 0)
}

function getExpectations (date, shifts, exceptions) {

}

function getCandidateEvents (candidates, from, to) {
  return candidates.filter(c => whereBetween(c.punch_time))
}

function getScheduleForDate(date, shifts, exceptions) {
  const shiftForDate = shifts
    .filter(shift => shift.end_date ? isWithinRange(date, shift.start_date, shift.end_date) : isAfter(date, shift.end_date))
    .sort(shift => compareAsc(shift.start_date, date))[0]

  const scheduleForDate = shiftForDate.slots[differenceInCalendarDays(date, shift.start_date) % shiftForDate.slots.length].schedule
}

function getAttendanceDay(events) {

}

const day = {
  date: null,
  events: [
    // array of raw times
  ],
  schedule: {

  }
}