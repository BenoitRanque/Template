const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class CoreSession extends Model {
  static get resourceName () { return 'CoreSession' }
  static get tableName () { return 'core_user_sessions' }
  static get idColumn () { return 'session_id' }
  static get jsonSchema () { 
    return {
      type: 'object',
      description: 'A User\'s session',
      properties: {
        'session_id': { type: 'string' },
        'user_id': { type: 'string' },
        'data': { type: 'object' },
        'expires': { type: 'string' }
      }
    }
  }
  static get relationMappings () {
    const User = require('./User')
    return {
      'password': {
        relation: BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'core_user_session.user_id',
          to: 'core_users.user_id'
        }
      }
    }
  }
}