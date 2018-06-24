const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class HRAttShiftSlot extends Model {
  static get tableName () { return 'hr_att_shift_slot' }
  static get idColumn () { return 'shift_slot_id' }
  static get relationMappings () {
    const AttShift = require('./AttShift')
    const AttTimetable = require('./AttTimetable')
    return {
      'shift': {
        relation: BelongsToOneRelation,
        modelClass: AttShift,
        join: {
          from: this.tableName + '.shift_id',
          to: AttShift.tableName + '.shift_id'
        }
      },
      'timetable': {
        relation: ManyToManyRelation,
        modelClass: AttTimetable,
        join: {
          from: this.tableName + '.shift_slot_id',
          through: {
            from: 'hr_att_shift_slot_timetable.shift_slot_id',
            to: 'hr_att_shift_slot_timetable.timetable_id'
          },
          to: AttTimetable.tableName + '.timetable_id'
        }
      }
    }
  }
}
