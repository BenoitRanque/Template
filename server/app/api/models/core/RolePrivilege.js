const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = require('objection').Model

module.exports = new Model({
  tableName: 'core_role_privileges',
  idColumn: ['role_id', 'privilege_id'],
  name: 'CoreRolePrivilege',
  description: 'A Privielge assigned to a role',
  resource: 'CoreRolePrivilege',
  schema: {
    type: 'object',
    properties: {
      'role_id': { type: 'string' },
      'privilege_id': { type: 'string' },
      'attributes': {
        type: 'array',
        items: { type: 'string' },
        description: 'The privilege has been granted for these atributes. [*] means all, [!] denies access'
      }
    }
  },
  relations: () => {
    const Privilege = require('./Privilege')
    const Role = require('./Role')
    return {
      'privilege': {
        relation: BelongsToOneRelation,
        modelClass: Privilege,
        join: {
          from: 'core_role_privileges.privilege_id',
          to: 'core_privileges.privilege_id'
        }
      },
      'role': {
        relation: BelongsToOneRelation,
        modelClass: Role,
        join: {
          from: 'core_role_privileges.role_id',
          to: 'core_roles.role_id'
        }
      }
    }
  },
  filters: {}
})
