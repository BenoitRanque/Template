const knex = require('../../../../db/knex')
const bcrypt = require('bcrypt')

module.exports = async function login (req, res, next) {
   
  let { username, password } = req.body
  
  let [user] = await knex('core_users').where({ username }).select()
  
  console.log(user)

  if (!user) return res.status(401).end()
  
  let auth = await bcrypt.compare(password, user.password)
  
  if (!auth) return res.status(401).end()

  // require('./access_control')(true) // update user roles

  delete user.password
  
  res.status(200).send(user)
}
