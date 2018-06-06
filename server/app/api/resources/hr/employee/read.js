module.exports = async (input, { eager }, { authorize, model }) => {
  console.log('getting users')
  let permission = authorize(model.resourceName, 'read', 'any')

  let data = await model.query().allowEager('[contact, contract]').eager(eager || '')

  return permission.filter(data)
}