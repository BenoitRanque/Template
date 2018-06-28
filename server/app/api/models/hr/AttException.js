const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class HRAttException extends Model {
  static get tableName () { return 'hr_att_exception' }
  static get idColumn () { return 'exception_id' }
  static get relationMappings () {
    const AttExceptionSlot = require('./AttExceptionSlot')
    const AttExceptionRequest = require('./AttExceptionRequest')
    const AttExceptionAuthorization = require('./AttExceptionAuthorization')
    const AttExceptionCancelation = require('./AttExceptionCancelation')
    const Employee = require('./Employee')
    return {
      'request': {
        relation: HasOneRelation,
        modelClass: AttExceptionRequest,
        join: {
          from: this.tableName + '.exception_id',
          to: AttExceptionRequest.tableName + '.exception_id'
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
      'cancelation': {
        relation: HasOneRelation,
        modelClass: AttExceptionCancelation,
        join: {
          from: this.tableName + '.exception_id',
          to: AttExceptionCancelation.tableName + '.exception_id'
        }
      },
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
      }
    }
  }
}
