const AccessControl = require('accesscontrol')
const knex = require('@db/knex')

const query = {
  roleExtensions: () => knex
  .select(['extended_role_id', 'base_role_id'])
  .from('core_role_extend'),
  roleWithPrivileges: () => knex
    .select(['core_role_privileges.role_id', 'core_role_privileges.attributes', 'core_privileges.resource', 'core_privileges.action'])
    .from('core_role_privileges')
    .leftJoin('core_privileges', 'core_role_privileges.privilege_id', 'core_privileges.privilege_id')
}

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

    let grants = await query.roleWithPrivileges()

    let ac = new AccessControl(grants.map(({role_id, attributes, resource, action}) => ({role: role_id, attributes, resource, action})))

    let extensions = await query.roleExtensions()

    extensions.forEach(({ base_role_id, extended_role_id }) => ac.extendRole(extended_role_id, base_role_id))

    this.ac = ac
  }
}
