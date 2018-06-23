const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class HRAttShift extends Model {
  static get tableName () { return 'hr_att_shift' }
  static get idColumn () { return 'shift_id' }
  static get relationMappings () {
    const AttShiftSlot = require('./AttShiftSlot')
    return {
      'slots': {
        relation: HasManyRelation,
        modelClass: AttShiftSlot,
        join: {
          from: this.tableName + '.shift_id',
          to: AttShiftSlot.tableName + '.shift_id'
        }
      }
    }
  }
}
