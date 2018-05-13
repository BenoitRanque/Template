const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = require('objection').Model

module.exports = new Model({
  tableName: 'core_roles',
  idColumn: 'role_id',
  name: 'CoreRole',
  resource: 'CoreRole',
  description: 'A Role wich can be assigned to a user, granting privileges',
  schema: {
    type: 'object',
    properties: {
      'role_id': { type: 'string' },
      'role_name': { type: 'string' },
      'description': { type: 'string', description: 'The role\'s description' }
    }
  },
  relations: () => {
    const Role = require('./Role')
    const Privilege = require('./Privilege')
    return {
      'privileges': {
        relation: ManyToManyRelation,
        modelClass: Privilege,
        join: {
          from: 'core_roles.role_id',
          through: {
            from: 'core_role_privileges.role_id',
            to: 'core_role_privileges.privilege_id'
          },
          to: 'core_privileges.privilege_id'
        }
      },
      'extends': {
        relation: ManyToManyRelation,
        modelClass: Role,
        join: {
          from: 'core_roles.role_id',
          through: {
            from: 'core_role_extend.extended_role_id',
            to: 'core_role_extend.base_role_id'
          },
          to: 'core_roles.role_id'
        }
      }
    }
  }
})
