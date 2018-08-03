const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model
const { formatDate, formatTime, parseDate, parseTime, parseInterval } = require('@tools/dateUtils')

module.exports = class HRAttTransaction extends Model {
  static get tableName () { return 'hr_att_transaction' }
  static get idColumn () { return 'transaction_id' }
  static get relationMappings () {
    const AttTimetype = require('./AttTimetype')
    const AttSchedule = require('./AttSchedule')
    const AttException = require('./AttException')
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
      'exception': {
        relation: BelongsToOneRelation,
        modelClass: AttException,
        join: {
          from: this.tableName + '.exception_id',
          to: AttException.tableName + '.exception_id'
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
      'timetype': {
        relation: HasOneRelation,
        modelClass: AttTimetype,
        join: {
          from: this.tableName + '.timetype_id',
          to: AttTimetype.tableName + '.timetype_id'
        }
      }
    }
  }
}
