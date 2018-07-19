const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model
const { formatDate, formatTime, parseDate, parseTime, parseInterval } = require('@tools/dateUtils')

module.exports = class HRAttTransaction extends Model {
  static get tableName () { return 'hr_att_transaction' }
  static get idColumn () { return 'transaction_id' }
  static get relationMappings () {
    const AttType = require('./AttType')
    const AttSchedule = require('./AttSchedule')
    const AttExceptionSlot = require('./AttExceptionSlot')
    const Employee = require('./Employee')
    const User = require('@models/core/User')
    return {
      'user': {
        relation: BelongsToOneRelation,
        modelClass: User,
        join: {
          from: this.tableName + '.user_id',
          to: User.tableName + '.user_id'
        }
      },
      'employee': {
        relation: BelongsToOneRelation,
        modelClass: Employee,
        join: {
          from: this.tableName + '.employee_id',
          to: Employee.tableName + '.employee_id'
        }
      },
      'exception_slot': {
        relation: BelongsToOneRelation,
        modelClass: AttExceptionSlot,
        join: {
          from: this.tableName + '.exception_slot_id',
          to: AttExceptionSlot.tableName + '.exception_slot_id'
        }
      },
      'schedule': {
        relation: BelongsToOneRelation,
        modelClass: AttSchedule,
        join: {
          from: this.tableName + '.schedule_id',
          to: AttSchedule.tableName + '.schedule_id'
        }
      },
      'type': {
        relation: HasOneRelation,
        modelClass: AttType,
        join: {
          from: this.tableName + '.type_id',
          to: AttType.tableName + '.type_id'
        }
      }
    }
  }
}
