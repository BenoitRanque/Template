const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class HRAttDay extends Model {
  static get tableName () { return 'hr_att_day' }
  static get idColumn () { return 'day_id' }
  static get relationMappings () {
    const AttTimetable = require('./AttTimetable')
    return {
      'timetable': {
        relation: ManyToManyRelation,
        modelClass: AttTimetable,
        join: {
          from: this.tableName + '.day_id',
          through: {
            from: 'hr_att_day_timetables.day_id',
            to: 'hr_att_day_timetables.timetable_id'
          },
          to: AttTimetable.tableName + '.timetable_id'
        }
      }
    }
  }
}
