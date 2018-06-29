const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class HRAttException extends Model {
  static get tableName () { return 'hr_att_exception' }
  static get idColumn () { return 'exception_id' }
  static get relationMappings () {
    const AttExceptionSlot = require('./AttExceptionSlot')
    const Employee = require('./Employee')
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
      }
    }
  }
}
