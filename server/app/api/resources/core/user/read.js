module.exports = async (input, params, { authorize, model }) => {
  let permission = authorize(model.resource, 'read', 'any')

  let data = await model.query().eager('[role]').returning(['username', 'displayname', 'descripcion', 'role'])

  return permission.filter(data)
}