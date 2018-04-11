const BaseModel = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = BaseModel

module.exports = class RolePrivilege extends BaseModel {
  static get tableName() { return 'core_role_privileges' }
  static get idColumn() { return ['role_id', 'privilege_id'] }
  static get name() { return 'CoreRolePrivilege' }
  static get resource() { return this.name }
  static get jsonSchema () {
    return {
      name: this.name,
      description: 'A Privielge assigned to a role',
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
    }
  }
  static get relationMappings () {
    return {
      'privilege': {
        relation: BelongsToOneRelation,
        modelClass: require('./Privilege'),
        join: {
          from: 'core_role_privileges.privilege_id',
          to: 'core_privileges.privilege_id'
        }
      },
      'role': {
        relation: BelongsToOneRelation,
        modelClass: require('./Role'),
        join: {
          from: 'core_role_privileges.role_id',
          to: 'core_roles.role_id'
        }
      }
    }
  }
}