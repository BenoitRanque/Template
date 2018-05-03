const AccessControl = require('accesscontrol')
const knex = require('@db/knex')
const Role = require('@api/core/models/Role')

module.exports = class AC {
  constructor () {
    this.refresh()
  }

  authenticate (session) {
    if (!session.user) throw new Error('401 Authentication Required')
  }

  authorize (session, resource, action) {

    this.authenticate(session)

    let permission = this.permission(session, resource, action)

    // if (!permission.granted) throw new Error(`403 Access Denied: ${action} ${resource}`)
    if (!permission.granted) console.log('Permission to ' + action + ' resource ' + resource  + ' denied')

    return permission
  }

  permission (session, resource, action) {
    if (Date.now() > this.lastRefreshTime + (1000 * 60 * 10)) this.refresh() // refresh every 10 minutes

    let role = session.user.role.map(({ role_id }) => role_id)
    let permission = this.ac.permission({ role, resource, action })
    return permission
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
          action: privilege.privilege.action
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
