const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class HRAttException extends Model {
  static get tableName () { return 'hr_att_exception' }
  static get idColumn () { return 'exception_id' }
  static get relationMappings () {
    const AttExceptionSlot = require('./AttExceptionSlot')
    const AttExceptionAuthorization = require('./AttExceptionAuthorization')
    const AttTransaction = require('./AttTransaction')
    const Employee = require('./Employee')
    const User = require('@models/core/User')
    return {
      'slots': {
        relation: HasManyRelation,
        modelClass: AttExceptionSlot,
        join: {
          from: this.tableName + '.exception_id',
          to: AttExceptionSlot.tableName + '.exception_id'
        }
      },
      'employee': {
        relation: HasOneRelation,
        modelClass: Employee,
        join: {
          from: this.tableName + '.employee_id',
          to: Employee.tableName + '.employee_id'
        }
      },
      'owner': {
        relation: BelongsToOneRelation,
        modelClass: User,
        join: {
          from: this.tableName + '.user_id',
          to: User.tableName + '.user_id'
        }
      },
      'authorization': {
        relation: HasOneRelation,
        modelClass: AttExceptionAuthorization,
        join: {
          from: this.tableName + '.exception_id',
          to: AttExceptionAuthorization.tableName + '.exception_id'
        }
      },
      'transaction': {
        relation: HasManyRelation,
        modelClass: AttTransaction,
        join: {
          from: this.tableName + '.exception_slot_id',
          to: AttTransaction.tableName + '.exception_slot_id'
        }
      }
    }
  }
}
