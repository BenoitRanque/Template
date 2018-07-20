const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class HRAttSchedule extends Model {
  static get tableName () { return 'hr_att_schedule' }
  static get idColumn () { return 'schedule_id' }
  static get relationMappings () {
    const AttScheduleBreak = require('./AttScheduleBreak')
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
      'break': {
        relation: HasManyRelation,
        modelClass: AttScheduleBreak,
        join: {
          from: this.tableName + '.schedule_id',
          to: AttScheduleBreak.tableName + '.schedule_id'
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
}