const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class HREmployeeData extends Model {
  static get tableName () { return 'hr_employee_data' }
  static get idColumn () { return 'employee_id' }
  static get relationMappings () {
    const Employee = require('./Employee')
    return {
      'employee': {
        relation: BelongsToOneRelation,
        modelClass: Employee,
        join: {
          from: this.tableName + '.employee_id',
          to: Employee.tableName + '.employee_id'
        }
      }
    }
  }
}
