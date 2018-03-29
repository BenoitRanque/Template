const AccessControl = require('accesscontrol').

module.exports = {
  async authentication (session) {
    if (!session.user) throw new Error(401)
    return true
  },
  async authorization (session, resource, action) {

    if (!this.ac) await this.init()

    await this.authentication(session)

    let { role } = session.user
    let permission = this.ac.permission({ role: user.role, resource, action })

    if (!permission.granted) throw new Error(403)

    return permission
  },
  ac: null,
  async init () {
    let grants = await require('@resources/core/Roles').allWithPrivileges()

    let ac = new AccessControl(grants.map(({role_id, attributes, resource, action}) => ({role: role_id, attributes, resource, action})))

    let extensions = await require('@resources/core/Roles').allExtensions()

    extensions.forEach(({ base_role_id, extended_role_id }) => ac.extendRole(extended_role_id, base_role_id))

    this.ac = ac
  }
}
