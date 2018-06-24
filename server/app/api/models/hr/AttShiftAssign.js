const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class HRAttShiftAssign extends Model {
  static get tableName () { return 'hr_att_shift_assign' }
  static get idColumn () { return 'shift_assign_id' }
  static get relationMappings () {
    const Employee = require('./Employee')
    const AttShift = require('./AttShift')
    const User = require('@models/core/User')
    return {
      'employee': {
        relation: HasOneRelation,
        modelClass: Employee,
        join: {
          from: this.tableName + '.employee_id',
          to: Employee.tableName + '.employee_id'
        }
      },
      'shift': {
        relation: HasOneRelation,
        modelClass: AttShift,
        join: {
          from: this.tableName + '.shift_id',
          to: AttShift.tableName + '.shift_id'
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
