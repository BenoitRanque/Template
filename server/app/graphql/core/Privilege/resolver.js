const Resolver = require('@services/resolver')
const knex = require('@db/knex')
const Privilege = require('./model')

const RESOURCE = 'core_Privilege'
const TABLE = 'core_privileges'
const METHODS = {
  'all': () => Privilege.query(),
  'read': privilege_id => Privilege.query().where({ privilege_id }).first(),
  'create': privilege => knex(TABLE).insert(privilege),
  'update': privilege => knex(TABLE).where({ privilege_id: privilege.privilege_id }).update(privilege),
  'delete': privilege => knex(TABLE).where({ privilege_id: privilege.privilege_id }).del()
  // 'all': () => knex(TABLE).select(),
  // 'read': privilege_id => knex(TABLE).where({ privilege_id }).first(),
  // 'create': privilege => knex(TABLE).insert(privilege),
  // 'update': privilege => knex(TABLE).where({ privilege_id: privilege.privilege_id }).update(privilege),
  // 'delete': privilege => knex(TABLE).where({ privilege_id: privilege.privilege_id }).del()
}

module.exports = class PrivilegeResolver extends Resolver {
  get resource () {
    return 'core_Privilege'
  }
  get model () {
    return Privilege
  }
}

{
  method: (Model, privilege_id) => Model.query().where({ privilege_id }) 
}