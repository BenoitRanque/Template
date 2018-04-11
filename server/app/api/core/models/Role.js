const BaseModel = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = BaseModel

module.exports = class Role extends BaseModel {
  static get tableName() { return 'core_roles' }
  static get idColumn() { return 'role_id' }
  static get name() { return 'CoreRole' }
  static get resource() { return this.name }
  static get jsonSchema () {
    return {
      name: this.name,
      description: 'A Role wich can be assigned to a user, granting privileges',
      type: 'object',
      properties: {
        'role_id': { type: 'string' },
        'role_name': { type: 'string' },
        'description': { type: 'string', description: 'The role\'s description' }
      }
    }
  }
  static get relationMappings () {
    return {
      'privileges': {
        relation: HasManyRelation,
        modelClass: require('./RolePrivilege'),
        join: {
          from: 'core_roles.role_id',
          to: 'core_role_privileges.role_id'
        }
      }
    }
  }
}
