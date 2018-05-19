const bcrypt = require('bcrypt')

module.exports = async function login ({ username, password }, params, { ServerError, model, session }) {
  const User = require('@models/core/User')

  if (!username) throw new ServerError(401)

  let user = await User.query().select('*').joinRelation('password').where({ username }).eager('[role.privileges]').first()
  if (!user) throw new ServerError(401)

  let auth = await bcrypt.compare(password, user.password)
  if (!auth) throw new ServerError(401)

  delete user.password

  let {
    user_id,
    displayname,
    role
  } = user

  session.user = {
    user_id,
    username,
    displayname
  }
  session.role = role.map(({ role_id }) => role_id)

  let privileges = {}
  role.forEach(role => {
    role.privileges.forEach(privilege => {
      let { resource_id, action, possession } = privilege
      if (!privileges[resource_id]) privileges[resource_id] = {}
      if (!privileges[resource_id][action]) privileges[resource_id][action] = []
      if (!privileges[resource_id][action].includes(possession)) privileges[resource_id][action].push(possession)
    })
  })
  return {
    privileges,
    user: {
      user_id,
      username,
      displayname
    }
  }
}
