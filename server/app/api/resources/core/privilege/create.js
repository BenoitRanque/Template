module.exports = async (input, params, { model, authorize }) => {

  let permission = authorize(model.resource, 'create', 'any')

  let data = await model.query().insert(permission.filter(input)).returning('*')

  permission = authorize(model.resource, 'read', 'any')

  return permission.filter(data)
}