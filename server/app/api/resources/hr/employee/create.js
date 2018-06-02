module.exports = async (input, params, { model, authorize }) => {

  let permission = authorize(model.resourceName, 'create', 'any')

  let data = await model.query().allowInsert('[data, data2, contact, contract, identification_document]')
    .insertGraph(permission.filter(input), {
      noDelete: '[contract, identification_document]'
    }).returning('*')

  permission = authorize(model.resourceName, 'read', 'any')

  return permission.filter(data)
}