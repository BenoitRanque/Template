module.exports = async (input, params, { model, authorize }) => {

  let permission = authorize(model.resourceName, 'create', 'any')

  let data = await model.query().allowUpsert('exception')
    .upsertGraph(permission.filter(input), {
      relate: ['exception']
    }).returning('*')

  permission = authorize(model.resourceName, 'read', 'any')

  return permission.filter(data)
}