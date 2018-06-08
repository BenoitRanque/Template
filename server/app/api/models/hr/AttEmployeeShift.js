const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class HRAtt extends Model {
  static get tableName () { return 'hr_att_day' }
  static get idColumn () { return 'day_id' }
  static get relationMappings () {
    const Employee = require('./Employee')
    const AttShift = require('./AttShift')
    return {
      'employee': {
        relation: BelongsToOneRelation,
        modelClass: Employee,
        join: {
          from: this.tableName + '.employee_id',
          to: Employee.tableName + '.employee_id'
        }
      },
      'shift': {
        relation: BelongsToOneRelation,
        modelClass: AttShift,
        join: {
          from: this.tableName + '.shift_id',
          to: AttShift.tableName + '.shift_id'
        }
      }
    }
  }
}
