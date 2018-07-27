const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model
const ServerError = require('@tools/serverError.js')

module.exports = class HRAttSchedule extends Model {
  static get tableName () { return 'hr_att_schedule' }
  static get idColumn () { return 'schedule_id' }
  static get relationMappings () {
    const AttScheduleBreaktime = require('./AttScheduleBreaktime')
    const AttScheduleUptime = require('./AttScheduleUptime')
    const AttScheduleDowntime = require('./AttScheduleDowntime')
    return {
      // 'shift_slot': {
      //   relation: HasManyRelation,
      //   modelClass: AttShiftSlot,
      //   join: {
      //     from: this.tableName + '.schedule_id',
      //     to: AttShiftSlot.tableName + '.schedule_id'
      //   }
      // },
      // 'exception_slot': {
      //   relation: HasManyRelation,
      //   modelClass: AttExceptionSlot,
      //   join: {
      //     from: this.tableName + '.schedule_id',
      //     to: AttExceptionSlot.tableName + '.schedule_id'
      //   }
      // },
      'breaktime': {
        relation: HasManyRelation,
        modelClass: AttScheduleBreaktime,
        join: {
          from: this.tableName + '.schedule_id',
          to: AttScheduleBreaktime.tableName + '.schedule_id'
        }
      },
      'uptime': {
        relation: HasManyRelation,
        modelClass: AttScheduleUptime,
        join: {
          from: this.tableName + '.schedule_id',
          to: AttScheduleUptime.tableName + '.schedule_id'
        }
      },
      'downtime': {
        relation: HasManyRelation,
        modelClass: AttScheduleDowntime,
        join: {
          from: this.tableName + '.schedule_id',
          to: AttScheduleDowntime.tableName + '.schedule_id'
        }
      }
    }
  }

  $beforeValidate(jsonSchema, json, opt) {
    if (!this.uptime || !this.downtime) throw new ServerError(400, `Validation Error: Schedule ${this.schedule_name} should have uptime and downtime properties`)
    const totalValue = 
      this.uptime.reduce((acc, val) => acc + Number(val.value), 0) +
      this.downtime.reduce((acc, val) => acc + Number(val.value), 0)
  
    if (totalValue !== 1) throw new ServerError(400, `Validation Error: Schedule ${this.schedule_name} does not meet value requirements; total value should be 1, is ${totalValue}`)

    return jsonSchema;
  }
}