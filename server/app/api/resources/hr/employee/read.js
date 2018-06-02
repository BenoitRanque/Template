module.exports = async (input, { eager }, { authorize, model }) => {
  console.log('getting users')
  let permission = authorize(model.resourceName, 'read', 'any')

  let data = await model.query().allowEager('[data, data2, contact, contract, identification_document]').eager(eager || '')

  return permission.filter(data)
}