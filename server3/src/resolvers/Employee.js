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
      return await Promise.all(eachDay(from, to).map(async date => {
        const between = [format(date, 'YYYY-MM-DD'), format(addDays(date, 1), 'YYYY-MM-DD')]
        const events = await knex('att_punches')
          .innerJoin('hr_employee', 'hr_employee.id', 'att_punches.emp_id')
          .select(['punch_time']) // posssibly inteeresting fields: 'punch_time', 'terminal_id', 'emp_pin'
          .where({ 'emp_pin': zkTimePin })
          .whereBetween('punch_time', between)

        return {
          date,
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