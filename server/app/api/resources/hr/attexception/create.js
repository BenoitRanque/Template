module.exports = async (input, params, { model, authorize }) => {

  let permission = authorize(model.resourceName, 'create', 'any')

  let data = await model.query().allowUpsert('[slots.[schedule.[breaktime, uptime, downtime], transaction], request, authorization]')
    .upsertGraph(permission.filter(input), {
      relate: ['slots.schedule'],
      insertMissing: ['slots'],
      noUpdate: true
    }).returning('*')

  permission = authorize(model.resourceName, 'read', 'any')

  return permission.filter(data)
}