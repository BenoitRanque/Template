module.exports = async (input, { exception_request_id }, { model, authorize }) => {

  let permission = authorize(model.resourceName, 'delete', 'any')

  let data = await model.query().delete().where({ exception_request_id }).returning('*')

  permission = authorize(model.resourceName, 'read', 'any')

  return permission.filter(data)
}