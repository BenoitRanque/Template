module.exports = async (input, { eager }, { authorize, model }) => {

  let permission = authorize(model.resourceName, 'read', 'any')

  let data = await model.query().allowEager('[break]').eager(eager || '')

  return permission.filter(data)
}