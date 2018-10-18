const format = require('date-fns/format')
const isWithinRange = require('date-fns/is_within_range')
const compareAsc = require('date-fns/compare_asc')
const addDays = require('date-fns/add_days')

const { ZKTIME_DB_PATH } = require('../utils')

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: ZKTIME_DB_PATH
  }
})

module.exports = {
  schedule: {
    resolve: async (obj, args, ctx, info) => !obj.schedule || !obj.schedule.id ? null : ctx.db.query.schedule({ where: { id: obj.schedule.id } }, info)
  },
  shift: {
    resolve: async (obj, args, ctx, info) => !obj.shift || !obj.shift.id ? null : ctx.db.query.shift({ where: { id: obj.shift.id } }, info)
  },
  exception: {
    resolve: async (obj, args, ctx, info) => !obj.exception || !obj.exception.id ? null : ctx.db.query.exception({ where: { id: obj.exception.id } }, info)
  },
  report: {
    fragment: `fragment reportData on AttendanceDate { zkTimePin shift { description } }`,
    resolve: async (obj, args, ctx, info) => {

      const events = await loadEvents(obj)
      console.log('report body', obj)


      return {
        events
      }
    }
  }
}


async function loadEvents({ date, innerBound, outerBound, zkTimePin }) {
  const between = [format(date, 'YYYY-MM-DD'), format(addDays(date, 2), 'YYYY-MM-DD')]

  const events = await knex('att_punches')
    .innerJoin('hr_employee', 'hr_employee.id', 'att_punches.emp_id')
    .select(['punch_time']) // posssibly interesting fields: 'punch_time', 'terminal_id', 'emp_pin'
    .where({ 'emp_pin': zkTimePin })
    .whereBetween('punch_time', between)

  return events
    .map(({ punch_time }) => punch_time)
    .filter(event => isWithinRange(event, innerBound, outerBound))
    .sort(compareAsc)
}
