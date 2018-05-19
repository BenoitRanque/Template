const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class CoreRole extends Model {
  static get resourceName () { return 'CoreRole' }
  static get tableName () { return 'core_roles' }
  static get idColumn () { return 'role_id' }
  static get jsonSchema () {
    return  {
      type: 'object',
      description: 'A Role wich can be assigned to a user, granting privileges',
      properties: {
        'role_id': { type: 'string' },
        'role_name': { type: 'string' },
        'description': { type: 'string', description: 'The role\'s description' }
      }
    }
  }
  static get relationMappings () {
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
}
