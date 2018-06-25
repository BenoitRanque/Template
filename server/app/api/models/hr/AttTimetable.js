const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class HRAttTimetable extends Model {
  static get tableName () { return 'hr_att_timetable' }
  static get idColumn () { return 'timetable_id' }
  static get relationMappings () {
    const AttBreak = require('./AttBreak')
    const AttType = require('./AttType')
    return {
      'break': {
        relation: ManyToManyRelation,
        modelClass: AttBreak,
        join: {
          from: this.tableName + '.timetable_id',
          through: {
            from: 'hr_att_timetable_breaks.timetable_id',
            to: 'hr_att_timetable_breaks.break_id'
          },
          to: AttBreak.tableName + '.break_id'
        }
      },
      'type': {
        relation: HasOneRelation,
        modelClass: AttType,
        join: {
          from: this.tableName + '.type_id',
          to: AttType.tableName + '.type_id'
        }
      }
    }
  }
}
