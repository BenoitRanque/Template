
const knex = require('../../../../db/knex')

// statefull internal reference of ac object
let ac;

module.exports = function ac (update) {
  if (update || !ac) {
    ac = new Promise(async (resolve, reject) => {
      try {
        // get grants from db
        let data = await knex(core_role_privileges).select().from('core_role_privileges')

        // let grants = data.map(item => {
        //   return item
        // })

        let grants = [
          { role: 'role1', resource: 'resource1', action: 'create', posession: 'any', attributes: [ attrs ] },
          { role: 'role1', resource: 'resource1', action: 'read', posession: 'own', attributes: [ attrs ] },
        ]

        resolve(new AccessControl(grants))

      } catch (error) {
        reject(error)
      }
    })
  }

  return async (req, res, next) => {
    try {
      req.ac = await ac
      next()
    } catch (error) {
      console.log(error)
      res.status(500).end()
    }
  }
}
