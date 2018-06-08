module.exports = async (input, params, { model, authorize }) => {

  let permission = authorize(model.resourceName, 'update', 'any')

  let data = await model.query().allowUpsert('[contact, contract]')
    .upsertGraph(permission.filter(input), {
      noDelete: ['contract']
    }).returning('*')

  permission = authorize(model.resourceName, 'read', 'any')

  return permission.filter(data)
}