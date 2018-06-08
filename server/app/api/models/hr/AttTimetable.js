const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class HRAttTimetable extends Model {
  static get tableName () { return 'hr_att_timetable' }
  static get idColumn () { return 'timetable_id' }
  static get relationMappings () {
    const AttBreak = require('./AttBreak')
    return {
      'break': {
        relation: HasManyRelation,
        modelClass: AttBreak,
        join: {
          from: this.tableName + '.timetable_id',
          through: {
            from: 'hr_att_timetable_breaks.timetable_id',
            to: 'hr_att_timetable_breaks.break_id'
          },
          to: AttBreak.tableName + '.break_id'
        }
      }
    }
  }
}
