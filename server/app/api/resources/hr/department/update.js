module.exports = async (input, params, { model, authorize }) => {

  let permission = authorize(model.resourceName, 'update', 'any')

  let data = await model.query().allowUpsert('[supervisors, subordinates]').upsertGraph(permission.filter(input), {
    relate: true,
    unrelate: true,
    noInsert: true
  }).returning('*')

  permission = authorize(model.resourceName, 'read', 'any')

  return permission.filter(data)
}