const ServerError = require('@tools/serverError')
const AttException = require('@models/hr/AttException')
const AttTransaction = require('@models/hr/AttTransaction')
const compareAsc = require('date-fns/compare_asc')
const isSameDay = require('date-fns/is_same_day')
const compareDesc = require('date-fns/compare_desc')
const EmployeeAttendance = require('@tools/employeeAttendance')
module.exports = async (input, params, { model, authorize, session, transaction }) => {

  let permission = authorize(model.resourceName, 'create', 'any')

  if (!input) throw new ServerError(400, `Invalid input`)

  const { granted, exception_id } = input

  if (!granted) {
    const data = await model.query().insert({
      granted, exception_id, user_id: session.user.user_id
    })

    permission = authorize(model.resourceName, 'read', 'any')

    return permission.filter(data)
  }

  debugger
  const exception = await AttException.query().where({ exception_id }).eager('[slots.schedule.[breaktime, uptime, downtime]]').first()
  
  const dates = exception.slots.map(slot => slot.date).sort(compareAsc)
  const attendance = new EmployeeAttendance(exception.employee_id, dates[0], dates[dates.length -1])
  await attendance.init()

  debugger

  const exceptionTransactions = attendance.getTransactionsForException(exception)
  const exceptionTransactionsWithUserId = exceptionTransactions.map(t => ({
    ...t,
    user_id: session.user.user_id
  }))
  const data = await transaction(model.knex(), async trx => {
    const authorization = await model.query(trx).insert({
      granted, exception_id, user_id: session.user.user_id
    })
    const transactions = await AttTransaction.query(trx).insert(exceptionTransactionsWithUserId)

    return authorization
  })

  permission = authorize(model.resourceName, 'read', 'any')

  return permission.filter(data)
}