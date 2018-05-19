module.exports = async (input, { user_id, own }, { model, authorize, session }) => {

  let permission = authorize(model.resourceName, 'update', own ? 'own' : 'any')

  await model.query().patch(permission.filter(input)).where({ user_id: own ? session.user.user_id : user_id })
}