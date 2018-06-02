module.exports = async (input, params, { model, authorize }) => {

  let permission = authorize(model.resourceName, 'update', 'any')

  let data = await model.query().allowUpsert('[data, data2, contact, contract, identification_document]')
    .upsertGraph(permission.filter(input), {
      noDelete: '[contract, identification_document]'
    }).returning('*')

  permission = authorize(model.resourceName, 'read', 'any')

  return permission.filter(data)
}