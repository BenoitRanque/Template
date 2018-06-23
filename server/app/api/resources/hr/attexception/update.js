module.exports = async (input, params, { model, authorize }) => {

  let permission = authorize(model.resourceName, 'update', 'any')

  let data = await model.query().allowUpsert('[slots.[timetable], employee, request.[user], authorization[user]]')
    .upsertGraph(permission.filter(input), { }).returning('*')

  permission = authorize(model.resourceName, 'read', 'any')

  return permission.filter(data)
}