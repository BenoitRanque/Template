const BaseModel = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = BaseModel

module.exports = class User extends BaseModel {
  static get tableName() { return 'core_users' }
  static get idColumn() { return 'user_id' }
  static get name() { return 'CoreUser' }
  static get resource() { return this.name }
  static get jsonSchema () {
    return {
      name: this.name,
      description: 'A User of the core module',
      type: 'object',
      properties: {
        'user_id': { type: 'string' },
        'username': { type: 'string' },
        'description': { type: 'string' }
      }
    }
  }
  static get relationMappings () {
    return {
      'role': {
        relation: ManyToManyRelation,
        modelClass: require('./Role'),
        join: {
          from: 'core_users.user_id',
          through: {
            from: 'core_user_roles.user_id',
            to: 'core_user_roles.role_id'
          },
          to: 'core_roles.role_id'
        }
      }
    }
  }
}
