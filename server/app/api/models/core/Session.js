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
        'expired': { type: 'string', format: 'date-time' }
      }
    }
  }
}