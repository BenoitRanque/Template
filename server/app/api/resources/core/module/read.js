module.exports = async (input, params, { authorize, model }) => {
  let permission = authorize(model.resource, 'read', 'any')

  let data = await model.query()

  return permission.filter(data)
}