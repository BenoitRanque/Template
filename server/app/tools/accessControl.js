const AccessControl = require('accesscontrol')
const knex = require('@db/knex')
const Role = require('@api/core/models/Role')

module.exports = class AC {
  constructor () {
    this.refresh()
  }

  async authenticate (session) {
    if (!session.user) throw new Error('401 Authentication Required')
  }

  async authorize (session, resource, action) {

    if (!this.ac) await this.refresh()

    await this.authenticate(session)

    let role = session.user.role.map(({ role_id }) => role_id)

    let permission = this.ac.permission({ role, resource, action })

    // if (!permission.granted) throw new Error('403 Access Denied')
    if (!permission.granted) console.log('Permission to ' + action + ' resource ' + resource  + ' denied')

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
  }
}
