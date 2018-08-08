const ServerError = require('@tools/serverError')
// const AttException = require('@models/hr/AttException')
// const AttTransaction = require('@models/hr/AttTransaction')
// const compareAsc = require('date-fns/compare_asc')
// const isSameDay = require('date-fns/is_same_day')
// const compareDesc = require('date-fns/compare_desc')
const isBefore = require('date-fns/is_before')
const eachDay = require('date-fns/each_day')
const EmployeeAttendance = require('@tools/employeeAttendance')
module.exports = async (input, { mode }, { model, authorize }) => {

  if (!mode) throw new ServerError(400, `mode is a required parameter, got ${mode}`)
  mode = Number(mode)

  switch (mode) {
    case 0:

      break
  }
  switch (mode) {
    // case 0:
    //   break
    // case 1:
    //   break
    case 2: return await switchSchedules(input)
    case 3: return await vacations(input)

    // case 3:
    //   // vacation
    //   if (!input.dateA || !input.dateB || !input.employee) throw new ServerError(400, `Mode 3 (vacation) requires dateA, dateB, employee arguments`)
    //   const { dateA, dateB, employee } = input
    //   if (!isBefore(dateA, dateB)) throw new ServerError(400, `Mode 3 requires dateA ${dateA} not be before dataB ${dateB}`)
    //   const attendance = new EmployeeAttendance(employee, dateA, dateB)
    //   await attendance.init()

    //   const data = {
    //     slots: eachDay(dateA, dateB).map(date => ({
    //       date,
    //       schedule
    //     }))
    //   }

      



    //   break
    default: throw new ServerError(400, `Unknown exception mode ${mode}`)
  }
}

async function switchSchedules({ employee, dateA, dateB } = {}) {
  if (!dateA || !dateB || !employee) throw new ServerError(400, `Mode 2 (switch) requires dateA, dateB, employee arguments`)
  const [ from, to ] = isBefore(dateA, dateB) ? [dateA, dateB] : [dateB, dateA]
  const attendance = new EmployeeAttendance(employee, from, to)
  await attendance.init()

  const data = {
    slots: [
      {
        date: from,
        schedule_id: attendance.getReferenceForDate(to).schedule.schedule_id,
        schedule: attendance.getReferenceForDate(to).schedule
      },
      {
        date: to,
        schedule_id: attendance.getReferenceForDate(from).schedule.schedule_id,
        schedule: attendance.getReferenceForDate(from).schedule
      },
    ]
  }
  return data
}

async function vacations({ dateA, dateB, employee } = {}) {
  if (!dateA || !dateB || !employee) throw new ServerError(400, `Mode 3 (vacation) requires dateA, dateB, employee arguments`)
  if (!isBefore(dateA, dateB)) throw new ServerError(400, `Mode 3 requires dateA ${dateA} not be before dataB ${dateB}`)
  const attendance = new EmployeeAttendance(employee, dateA, dateB)
  await attendance.init()
  
  const slots = await attendance.getVacationScheduleForDateRange(dateA, dateB)

  const data = {
    slots
  }
  return data
}