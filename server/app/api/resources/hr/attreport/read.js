const knextlite = require('@db/knexlite')

function toSqlDate (d) {
  return `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).substr(-2, 2)}-${d.getDate()}`
}

module.exports = async (input, params, context) => {
  let from = new Date()
  from.setDate(from.getDate() - 7)
  let to = new Date()
  return await knextlite('att_punches')
    .innerJoin('hr_employee', 'hr_employee.id', 'att_punches.emp_id')
    .select(['punch_time', 'terminal_id', 'emp_pin'])
    .where({ 'emp_pin': 513 })
    .whereBetween('punch_time', [toSqlDate(from), toSqlDate(to)])
    .limit(20)
  // return await knextlite('att_punches').select().limit(20)
  // return await knextlite.raw("SELECT name FROM sqlite_master WHERE type='table'")
}