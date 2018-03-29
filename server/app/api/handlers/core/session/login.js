const Users = require('../../resources/Users')
const UserRoles = require('../../resources/UserRoles')
const bcrypt = require('bcrypt')

module.exports = async function login ({ session, body }) {

  let { username, password } = body.user

  // find user
  let [user] = await Users.findByUsername(username)
  if (!user) return res.status(401).end()

  // check password
  let auth = await bcrypt.compare(password, user.password)
  if (!auth) return res.status(401).end()

  // remove password
  delete user.password

  // add roles to user object
  let role = await UserRoles.findByUserId(user.user_id)
  user.role = role.map(({role_id}) => role_id)

  // persist user session
  session.user = user

  // update user roles
  require('./access_control')(true)

  return (({ username, displayname, description, role }) => ({ username, displayname, description, role }))(user)

  // send subset of user as response
  // res.status(200).send({ user: (({ username, displayname, description, role }) => ({ username, displayname, description, role }))(user) })

}

