module.exports = async (input, params, { model, authorize }) => {

  let permission = authorize(model.resourceName, 'update', 'any')

  let data = await model.query().allowUpsert('slots.timetable.break')
    .upsertGraph(permission.filter(input), {
      relate: ['slots.timetable'],
      unrelate: ['slots.timetable'],
      insertMissing: ['slots']
    }).returning('*')

  permission = authorize(model.resourceName, 'read', 'any')

  return permission.filter(data)
}