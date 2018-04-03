const knex = require('@db/knex')
const authorize = require('@services/authorize')

module.exports = [
  authorize({ resource: 'core.user', action: 'read:any' }),
  async function (req, res) {
    try {
  
      let users = await knex.from('core_users').select()
  
      res.status(200).end(req.permission.filter(users))
  
    } catch (error) {
      console.log(error)
      res.status(500).end()
    }
  }
]
