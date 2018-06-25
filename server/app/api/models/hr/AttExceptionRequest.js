const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class HRAttExceptionRequest extends Model {
  static get tableName () { return 'hr_att_exception_request' }
  static get idColumn () { return 'exception_id' }
  static get relationMappings () {
    const AttException = require('./AttException')
    const User = require('@models/core/User')
    return {
      'exception': {
        relation: BelongsToOneRelation,
        modelClass: AttException,
        join: {
          from: this.tableName + '.exception_id',
          to: AttException.tableName + '.exception_id'
        }
      },
      'user': {
        relation: HasOneRelation,
        modelClass: User,
        join: {
          from: this.tableName + '.user_id',
          to: User.tableName + '.user_id'
        }
      }
    }
  }
}