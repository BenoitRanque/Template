module.exports = async (input, params, { model, authorize }) => {

  let permission = authorize(model.resourceName, 'update', 'any')

  let data = await model.query().allowUpsert('[slots.schedule.timetable, employee, owner, authorization.user]')
    .upsertGraph(permission.filter(input), {
      relate: ['employee', 'owner']
    }).returning('*')

  permission = authorize(model.resourceName, 'read', 'any')

  return permission.filter(data)
}