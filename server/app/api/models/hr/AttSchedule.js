const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class HRAttSchedule extends Model {
  static get tableName () { return 'hr_att_schedule' }
  static get idColumn () { return 'schedule_id' }
  static get relationMappings () {
    const AttTimetable = require('./AttTimetable')
    const AttShiftSlot = require('./AttShiftSlot')
    const AttExceptionSlot = require('./AttExceptionSlot')
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
      'timetable': {
        relation: HasManyRelation,
        modelClass: AttTimetable,
        join: {
          from: this.tableName + '.schedule_id',
          to: AttTimetable.tableName + '.schedule_id'
        }
      }
    }
  }
}