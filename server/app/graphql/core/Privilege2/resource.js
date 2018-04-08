const Resolver = require('@services/resolver')
const knex = require('@db/knex')

const RESOURCE = 'core_Privilege'
const TABLE = 'core_privileges'
const METHODS = {
  'all': () => knex(TABLE).select(),
  'read': privilege_id => knex(TABLE).where({ privilege_id }).first(),
  'create': privilege => knex(TABLE).insert(privilege),
  'update': privilege => knex(TABLE).where({ privilege_id: privilege.privilege_id }).update(privilege),
  'delete': privilege => knex(TABLE).where({ privilege_id: privilege.privilege_id }).del()
}

module.exports = class PrivilegeResolver {
  constructor (options) {
    return new Resolver (options, RESOURCE, METHODS)
  }
}