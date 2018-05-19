module.exports = async (input, params, { model, authorize }) => {

  let permission = authorize(model.resourceName, 'create', 'any')

  let data = await model.query().allowInsert('[privileges, extends]').insertGraph(permission.filter(input), {
    relate: true,
    unrelate: true
  }).returning('*')

  permission = authorize(model.resourceName, 'read', 'any')

  return permission.filter(data)
}