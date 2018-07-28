module.exports = async (input, params, { model, authorize }) => {

  let permission = authorize(model.resourceName, 'update', 'any')

  let data = await model.query().allowUpsert('[slots.schedule.[breaktime, uptime, downtime], employee]')
    .upsertGraph(permission.filter(input), {
      relate: ['employee'],
      unrelate: ['slots.schedule'],
      insertMissing: ['slots']
    }).returning('*')

  permission = authorize(model.resourceName, 'read', 'any')

  return permission.filter(data)
}