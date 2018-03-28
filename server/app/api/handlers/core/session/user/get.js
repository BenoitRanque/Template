const knex = require('../../../../db/knex')
const authorize = require('../../services/authorize')

module.exports = [
  authorize({ resource: 'core.user', action: 'read:own' }),
  async function (req, res) {
    try {
  
      let { user_id } = req.session.user
      let [ user ] = await knex.where({ user_id }).select().from('core_users')
  
      res.status(200).send(req.permission.filter(user))
  
    } catch (error) {
      console.log(error)
      res.status(500).end()
    }
  }
]
