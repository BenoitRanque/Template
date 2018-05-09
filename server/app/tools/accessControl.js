const AccessControl = require('accesscontrol')
const Role = require('@models/core/Role')

class AC {
  constructor () {
    this.refresh()
  }

  authenticate (session) {
    if (!session.user) throw new Error('401 Authentication Required')
  }

  authorize (session, resource, action, possession) {
    
    let permission = this.permission(session, resource, action, possession)  
    if (!permission.granted) throw new Error(`403 Access Denied: ${action} ${resource}`)
    
    return permission
  }
  
  permission (session, resource, action, possession) {   
    
    // spoof of real function, for dev
    console.log(`permission to ${resource} to ${action}:${possession} spoofed. TURN OFF IN PRODUCTION`)
    return {
      granted: true,
      filter: items => items,
      attributes: ['*']
    }
    this.authenticate(session)

    let { role } = session
    let permission = this.ac.permission({ role, resource, action, possession: possession ? possession : 'any' })
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

    let roles = await Role.query().eager('[extends, privileges.privilege]')

    const grants = []

    roles.forEach(role => {
      role.privileges.forEach(privilege => {
        grants.push({
          role: role.role_id,
          attributes: privilege.attributes,
          resource: privilege.privilege.resource,
          action: privilege.privilege.action,
          possession: privilege.privilege.possession
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
