module.exports = async (input, params, { model, authorize }) => {

  let permission = authorize(model.resourceName, 'update', 'any')

  let data = await model.query().allowUpsert('slots.schedule.timetable')
    .upsertGraph(permission.filter(input), {
      relate: ['slots.schedule'],
      unrelate: ['slots.schedule'],
      insertMissing: ['slots'],
      relate: ['slots.schedule', 'slots.schedule.timetable']
    }).returning('*')

  permission = authorize(model.resourceName, 'read', 'any')

  return permission.filter(data)
}