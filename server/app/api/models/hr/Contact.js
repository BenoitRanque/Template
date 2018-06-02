const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class HRContact extends Model {
  static get tableName () { return 'hr_contact' }
  static get idColumn () { return 'contact_id' }
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