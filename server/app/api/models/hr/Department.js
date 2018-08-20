const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class HRDepartment extends Model {
  static get tableName () { return 'hr_department' }
  static get idColumn () { return 'department_id' }
  static get relationMappings () {
    const Employee = require('./Employee')
    const User = require('@models/core/User')
    return {
      supervisors: {
        relation: ManyToManyRelation,
        modelClass: User,
        join: {
          from: this.tableName + '.' + this.idColumn,
          through: {
            from: 'hr_department_supervisor.' + this.idColumn,
            to: 'hr_department_supervisor.' + User.idColumn
          },
          to: User.tableName + '.' + User.idColumn
        }
      },
      subordinates: {
        relation: ManyToManyRelation,
        modelClass: Employee,
        join: {
          from: this.tableName + '.' + this.idColumn,
          through: {
            from: 'hr_department_subordinate.' + this.idColumn,
            to: 'hr_department_subordinate.' + Employee.idColumn
          },
          to: Employee.tableName + '.' + Employee.idColumn
        }
      }
    }
  }
}