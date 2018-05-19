module.exports = async (input, { privilege_id }, { model, authorize }) => {

  let permission = authorize(model.resourceName, 'update', 'any')

  let data =  model.query().patch(permission.filter(input)).where({ privilege_id }).returning('*')

  permission = authorize(model.resourceName, 'read', 'any')

  return permission.filter(data)
}