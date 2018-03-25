
const knex = require('../../../../db/knex')
const AccessControl = require('accesscontrol')

// statefull internal reference of ac object
let ac

module.exports = function ac (update) {
  if (update || !ac) {
    ac = new Promise(async (resolve, reject) => {
      try {
        // get grants from db
        let grants = await knex
          .select(['core_role_privileges.role_id', 'core_role_privileges.attributes', 'core_privileges.resource', 'core_privileges.action'])
          .from('core_role_privileges')
          .leftJoin('core_privileges', 'core_role_privileges.privilege_id', 'core_privileges.privilege_id')


        let ac = new AccessControl(grants.map(({role_id, attributes, resource, action}) => ({role: role_id, attributes, resource, action})))

        let extensions = await knex
          .select(['extended_role_id', 'base_role_id'])
          .from('core_role_extend')
        
        extensions.forEach(({ base_role_id, extended_role_id }) => ac.extendRole(extended_role_id, base_role_id))

        resolve(ac)

      } catch (error) {
        console.log(error)
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
