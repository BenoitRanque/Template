module.exports = async (input, params, { authorize, model }) => {
  let permission = authorize(model.resourceName, 'read', 'any')

  let data = await model.query().eager('[privileges, extends]')

  return permission.filter(data)
}