const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class CoreUser extends Model {
  static get resourceName () { return 'CoreUser' }
  static get tableName () { return 'core_users' }
  static get idColumn () { return 'user_id' }
  static get jsonSchema () { 
    return {
      type: 'object',
      required: ['username'],
      description: 'A User of the core module',
      properties: {
        'user_id': { type: 'string' },
        'username': {
          description: 'a unique user identifier',
          type: 'string'
        },
        'displayname': {
          type: 'string'
        },
        'description': { type: 'string' }
      }
    }
  }
  static get relationMappings () {
    const Role = require('./Role')
    const Password = require('./Password')
    return {
      'role': {
        graph: {
          insert: false,
          upsert: false
        },
        relation: ManyToManyRelation,
        modelClass: Role,
        join: {
          from: 'core_users.user_id',
          through: {
            from: 'core_user_roles.user_id',
            to: 'core_user_roles.role_id'
          },
          to: 'core_roles.role_id'
        }
      },
      'password': {
        relation: HasOneRelation,
        modelClass: Password,
        join: {
          from: 'core_users.user_id',
          to: 'core_user_password.user_id'
        }
      }
    }
  }
}
