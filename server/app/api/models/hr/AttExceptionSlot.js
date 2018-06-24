const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class HRAttExceptionSlot extends Model {
  static get tableName () { return 'hr_att_exception_slot' }
  static get idColumn () { return 'exception_slot_id' }
  static get relationMappings () {
    const AttException = require('./AttException')
    const AttTimetable = require('./AttTimetable')
    return {
      'exception': {
        relation: BelongsToOneRelation,
        modelClass: AttException,
        join: {
          from: this.tableName + '.exception_id',
          to: AttException.tableName + '.exception_id'
        }
      },
      'timetable': {
        relation: HasManyRelation,
        modelClass: AttTimetable,
        join: {
          from: this.tableName + '.exception_slot_id',
          trough: {
            from: 'hr_att_exception_slot_timetable.exception_slot_id',
            to: 'hr_att_exception_slot_timetable.timetable_id'
          },
          to: AttTimetable.tableName + '.timetable_id'
        }
      }
    }
  }
}
