const Resolver = require('@services/resolver')
const knex = require('@db/knex')
const { isEmpty } = require('@services/utils')

const RESOURCE = 'core_Role'
const METHODS = {
  'RoleByUser': async user_id => {
    if (!user_id) return null
    return knex
      .where({ 'core_user_roles.user_id': userId })
      .from('core_user_roles')
      .select(['core_roles.role_id', 'core_roles.role_name', 'core_user_roles.grantor_id', 'core_roles.role_description'])
      .leftJoin('core_roles', 'core_user_roles.role_id', 'core_roles.role_id')
  },
  'RoleByExtendedRole': async base_role_id => {
    if (!base_role_id) return null
    return knex
    .where({ 'core_role_extend.base_role_id': baseRoleId })
    .from('core_role_extend')
    .select(['core_roles.role_id', 'core_roles.role_name'])
    .leftJoin('core_roles', 'core_role_extend.base_role_id', 'core_roles.role_id')
  }
}

module.exports = class SessionResolver {
  constructor (options) {
    return new Resolver (options, RESOURCE, METHODS)
  }
}