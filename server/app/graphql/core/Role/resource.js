const Resolver = require('@services/resolver')
const knex = require('@db/knex')
const { isEmpty } = require('@services/utils')

const RESOURCE = 'core_Role'
const METHODS = {
  'userRole': async userId => knex
    .where({ 'core_user_roles.user_id': userId })
    .from('core_user_roles')
    .select(['core_roles.role_id', 'core_roles.role_name', 'core_user_roles.grantor_id', 'core_roles.role_description'])
    .leftJoin('core_roles', 'core_user_roles.role_id', 'core_roles.role_id')
  ,
  'extendedRole': async baseRoleId => knex
    .where({ 'core_role_extend.base_role_id': baseRoleId })
    .from('core_role_extend')
    .select(['core_roles.role_id', 'core_roles.role_name'])
    .leftJoin('core_roles', 'core_role_extend.base_role_id', 'core_roles.role_id')
}

module.exports = class SessionResolver {
  constructor (options) {
    return new Resolver (options, RESOURCE, METHODS)
  }
}