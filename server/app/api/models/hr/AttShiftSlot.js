const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class HRAttShiftSlot extends Model {
  static get tableName () { return 'hr_att_shift_slot' }
  static get idColumn () { return 'shift_slot_id' }
  static get relationMappings () {
    const AttShift = require('./AttShift')
    const AttSchedule = require('./AttSchedule')
    return {
      'shift': {
        relation: BelongsToOneRelation,
        modelClass: AttShift,
        join: {
          from: this.tableName + '.shift_id',
          to: AttShift.tableName + '.shift_id'
        }
      },
      'schedule': {
        relation: HasOneRelation,
        modelClass: AttSchedule,
        join: {
          from: this.tableName + '.schedule_id',
          to: AttSchedule.tableName + '.schedule_id'
        }
      }
    }
  }
}
