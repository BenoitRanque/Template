module.exports = async (input, { privilege_id }, { model, authorize }) => {

  let permission = authorize(model.resource, 'update', 'any')

  let data = await model.query().allowUpsert('[privileges, extends]').upsertGraph(permission.filter(input), {
    relate: true,
    unrelate: true
  }).returning('*')

  permission = authorize(model.resource, 'read', 'any')

  return permission.filter(data)
}