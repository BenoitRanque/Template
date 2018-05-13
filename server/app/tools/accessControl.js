const AccessControl = require('accesscontrol')
const Role = require('@models/core/Role')
const ServerError = require('@tools/serverError')

class AC {
  constructor () {
    this.refresh()
  }

  authenticate (session) {
    if (!session.user) throw new ServerError(401)
  }

  authorize (session, resource, action, possession = 'any') {
    
    let permission = this.permission(session, resource, action, possession)  
    if (!permission.granted) throw new ServerError(403, `${action}:${possession} ${resource}`)
    
    return permission
  }
  
  permission (session, resource, action, possession = 'any') {   
    
    // spoof of real function, for dev
    console.log(`permission to ${action}:${possession} ${resource} spoofed. TURN OFF IN PRODUCTION`)
    return {
      granted: true,
      filter: items => items,
      attributes: ['*']
    }
    this.authenticate(session)

    let { role } = session
    let permission = this.ac.permission({ role, resource, action, possession })
    return permission
  }
  
  middleware () {
    return async (req, res, next) => {
      req.accessControl = this
      if (Date.now() > this.lastRefreshTime + (1000 * 60 * 10)) {
        await this.refresh() // refresh every 10 minutes
      }
      next()
    }
  }

  async refresh () {

    let roles = await Role.query().eager('[extends, privileges]')

    const grants = []

    roles.forEach(({ role_id, privileges }) => {
      privileges.forEach(({ attributes, resource_id, action, possession }) => {
        grants.push({
          role: role_id,
          attributes,
          resource: resource_id,
          action,
          possession
        })
      })
    })

    let ac = new AccessControl(grants)

    roles.forEach(role => {
      role.extends.forEach(extendedRole => {
        ac.extendRole(role.role_id, extendedRole.role_id)
      })
    })

    this.ac = ac
    this.lastRefreshTime = Date.now()
  }
}

module.exports = new AC
