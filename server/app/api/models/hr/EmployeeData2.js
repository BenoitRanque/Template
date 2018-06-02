const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class HREmployeeData2 extends Model {
  static get tableName () { return 'hr_employee_data2' }
  static get idColumn () { return 'employee_id' }
  static get relationMappings () {
    const Employee = require('./Employee')
    return {
      'employee': {
        relation: BelongsToOneRelation,
        modelClass: Employee,
        join: {
          from: 'hr_employees_data2.employee_id',
          to: 'hr_employee.employee_id'
        }
      }
    }
  }
}
