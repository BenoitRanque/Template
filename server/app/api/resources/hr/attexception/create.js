const compareAsc = require('date-fns/compare_asc')
const isSameDay = require('date-fns/is_same_day')
const compareDesc = require('date-fns/compare_desc')
const ServerError = require('@tools/serverError')
const EmployeeAttendance = require('@tools/employeeAttendance')

module.exports = async (input, params, { model, authorize, session, transaction }) => {

  let permission = authorize(model.resourceName, 'create', 'any')

  if (!input.employee_id) throw new ServerError(400, `employee_id  is a required field`)

  const dates = input.slots.map(slot => slot.date).sort(compareAsc)
  
  dates.forEach((date, index) => {
    if (index !== 0 && isSameDay(date, dates[index -1])) {
      throw new ServerError(400, `duplicate date ${date} in exception`)
    }
  })

  input.owner_id = session.user.user_id

console.log(input)
console.log(input.slots[0].schedule)

  const data = await transaction(model.knex(), async trx => await model.query(trx)
    .allowUpsert('[slots.[schedule.[breaktime, uptime, downtime], transaction], authorization, owner]')
    .upsertGraph(permission.filter(input), {
      relate: ['slots.schedule', 'slots.schedule.breaktime', 'slots.schedule.uptime', 'slots.schedule.downtime'],
      // relate: ['slots.schedule', 'owner', 'slots.schedule.[breaktime, uptime, downtime]'],
      noUpdate: true
    }).returning('*')
  )

  permission = authorize(model.resourceName, 'read', 'any')

  return permission.filter(data)
}