module.exports = async (input, { role_id }, { model, authorize }) => {

  let permission = authorize(model.resource, 'delete', 'any')

  let data = await model.query().delete().where({ role_id }).returning('*')

  permission = authorize(model.resource, 'read', 'any')

  return permission.filter(data)
}