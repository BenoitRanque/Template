const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model
const { formatDate, formatTime, parseDate, parseTime, parseInterval } = require('@tools/dateUtils')

module.exports = class HRAttShift extends Model {
  static get tableName () { return 'hr_att_shift' }
  static get idColumn () { return 'shift_id' }
  static get relationMappings () {
    const AttShiftSlot = require('./AttShiftSlot')
    const Employee = require('./Employee')
    const User = require('@models/core/User')
    return {
      'slots': {
        relation: HasManyRelation,
        modelClass: AttShiftSlot,
        join: {
          from: this.tableName + '.shift_id',
          to: AttShiftSlot.tableName + '.shift_id'
        }
      },
      'employee': {
        relation: HasOneRelation,
        modelClass: Employee,
        join: {
          from: this.tableName + '.employee_id',
          to: Employee.tableName + '.employee_id'
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

  async $beforeInsert (ctx) {
    this.created_at = new Date().toISOString();
    this.start_date ? this.start_date = formatDate(this.start_date) : null
    this.end_date ? this.end_date = formatDate(this.end_date) : null
    this.slots ? this.slots = this.slots.map(({ schedule }, index) => ({ index, schedule})) : null
  }
  
  async $beforeUpdate (ctx) {
    this.updated_at = new Date().toISOString();
    this.start_date ? this.start_date = formatDate(this.start_date) : null
    this.end_date ? this.end_date = formatDate(this.end_date) : null
    // this.slots ? this.slots = this.slots.map(({ schedule }, index) => ({ index, schedule})) : null
  }
  
  async $afterGet (ctx) {
    this.start_date ? this.start_date = parseDate(this.start_date) : null
    this.end_date ? this.end_date = parseDate(this.end_date) : null
    this.slots ? this.slots = this.slots.sort((a, b) => b.index - a.index) : null
    return this
  }
}
