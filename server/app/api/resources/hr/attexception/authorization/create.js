const ServerError = require('@tools/serverError')
const AttException = require('@models/hr/AttException')
module.exports = async (input, params, { model, authorize }) => {

  let permission = authorize(model.resourceName, 'create', 'any')

  if (!input) throw new ServerError(400, `Invalid input`)

  const { granted, exception_id } = input

  const exception = await AttException.query().where({ exception_id }).eager('[slots.schedule.[breaktime, uptime, downtime]]').first()

  // get regular schedule

  // add authorization
  // add transactions of days

  let data = await model.query().allowUpsert('exception')
    .upsertGraph(permission.filter(input), {
      relate: ['exception']
    }).returning('*')

  permission = authorize(model.resourceName, 'read', 'any')

  return permission.filter(data)
}