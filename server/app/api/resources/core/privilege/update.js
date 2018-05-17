module.exports = async (input, { privilege_id }, { model, authorize }) => {

  let permission = authorize(model.resource, 'update', 'any')

  let data =  await model.query().patch(permission.filter(input)).where({ privilege_id }).returning('*')

  permission = authorize(model.resource, 'read', 'any')

  return permission.filter(data)
}