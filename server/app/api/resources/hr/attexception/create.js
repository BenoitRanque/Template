module.exports = async (input, params, { model, authorize, session }) => {

  let permission = authorize(model.resourceName, 'create', 'any')

  input.owner_id = session.user_id

  let data = await model.query().allowUpsert('[slots.[schedule.[breaktime, uptime, downtime], transaction], authorization]')
    .upsertGraph(permission.filter(input), {
      relate: ['slots.schedule', 'owner'],
      noUpdate: true
    }).returning('*')

  permission = authorize(model.resourceName, 'read', 'any')

  return permission.filter(data)
}