const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class HRAttExceptionSlot extends Model {
  static get tableName () { return 'hr_att_exception_slot' }
  static get idColumn () { return 'exception_slot_id' }
  static get relationMappings () {
    const AttException = require('./AttException')
    const AttSchedule = require('./AttSchedule')
    return {
      'exception': {
        relation: BelongsToOneRelation,
        modelClass: AttException,
        join: {
          from: this.tableName + '.exception_id',
          to: AttException.tableName + '.exception_id'
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
