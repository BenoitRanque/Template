module.exports = async (input, { break_id }, { model, authorize }) => {

  let permission = authorize(model.resourceName, 'delete', 'any')

  let data = await model.query().delete().where({ break_id }).returning('*')

  permission = authorize(model.resourceName, 'read', 'any')

  return permission.filter(data)
}