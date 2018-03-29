const knex = require('@db/knex')

module.exports = {
  allExtensions: () => knex
    .select(['extended_role_id', 'base_role_id'])
    .from('core_role_extend'),
  allWithPrivileges: () => knex
    .select(['core_role_privileges.role_id', 'core_role_privileges.attributes', 'core_privileges.resource', 'core_privileges.action'])
    .from('core_role_privileges')
    .leftJoin('core_privileges', 'core_role_privileges.privilege_id', 'core_privileges.privilege_id')
}
