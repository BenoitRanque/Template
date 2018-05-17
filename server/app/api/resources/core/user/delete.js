module.exports = async (input, { user_id }, { model, authorize }) => {

  let permission = authorize(model.resource, 'delete', 'any')

  let data = model.query().delete().where({ user_id }).returning('*')

  permission = authorize(model.resource, 'read', 'any')

  return permission.filter(data)
}