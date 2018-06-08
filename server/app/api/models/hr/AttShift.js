const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class HRAttShift extends Model {
  static get tableName () { return 'hr_att_shift' }
  static get idColumn () { return 'shift_id' }
  static get relationMappings () {
    const AttDay = require('./AttDay')
    return {
      'day': {
        relation: HasManyRelation,
        modelClass: AttDay,
        join: {
          from: this.tableName + '.shift_id',
          through: {
            from: 'hr_att_shift_days.shift_id',
            to: 'hr_att_shift_days.day_id'
          },
          to: AttDay.tableName + '.day_id'
        }
      }
    }
  }
}
