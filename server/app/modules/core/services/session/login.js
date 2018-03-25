const knex = require('../../../../db/knex')
const bcrypt = require('bcrypt')

module.exports = async function login (req, res, next) {
  try {
    
      let { username, password } = req.body

      // find user    
      let [user] = await knex('core_users').where({ username }).select()
      if (!user) return res.status(401).end()
    
      // check password
      let auth = await bcrypt.compare(password, user.password)
      if (!auth) return res.status(401).end()
    
      // remove password
      delete user.password
    
      // build complete user object
      let role = await knex('core_user_roles').where({ user_id: user.user_id }).select(['role_id'])
      user.role = role.map(({role_id}) => role_id)
    
      // persist user session
      req.session.user = user
    
      // update user roles
      require('./access_control')(true)
    
      // send subset of user as response
      res.status(200).send({ user: (({ username, displayname, description, role }) => ({ username, displayname, description, role }))(user) })

  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}
