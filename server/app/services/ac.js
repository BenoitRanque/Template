const AccessControl = require('accesscontrol')
const knex = require('@db/knex')

module.exports = class AC {
  constructor () {
    this.refresh()
  }

  async authenticate (session) {
    if (!session.user) throw new Error('401 Authentication Required')
    return true
  }

  async authorize (session, resource, action) {

    console.log(session)

    if (!this.ac) await this.refresh()

    await this.authenticate(session)

    let permission = this.ac.permission({ role: session.user.role , resource, action })

    if (!permission.granted) throw new Error('403 Access Denied')

    return permission
  }

  async refresh () {

    let grants = await this.loadRolePrivileges()

    let ac = new AccessControl(grants.map(({role_id, attributes, resource, action}) => ({role: role_id, attributes, resource, action})))

    let extensions = await this.loadRoleExtensions()

    extensions.forEach(({ base_role_id, extended_role_id }) => ac.extendRole(extended_role_id, base_role_id))

    this.ac = ac
  }

  loadRolePrivileges () {
    return knex
      .select(['core_role_privileges.role_id', 'core_role_privileges.attributes', 'core_privileges.resource', 'core_privileges.action'])
      .from('core_role_privileges')
      .leftJoin('core_privileges', 'core_role_privileges.privilege_id', 'core_privileges.privilege_id')
  }

  loadRoleExtensions () {
    return knex
      .select(['extended_role_id', 'base_role_id'])
      .from('core_role_extend')
  }
}
