const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model
const { formatDate, formatTime, parseDate, parseTime, parseInterval } = require('@tools/dateUtils')

module.exports = class HRAttScheduleDowntime extends Model {
  static get tableName () { return 'hr_att_schedule_downtime' }
  static get idColumn () { return 'schedule_downtime_id' }
  static get relationMappings () {
    const AttTimetype = require('./AttTimetype')
    const AttSchedule = require('./AttSchedule')
    return {
      'schedule': {
        relation: BelongsToOneRelation,
        modelClass: AttSchedule,
        join: {
          from: this.tableName + '.schedule_id',
          to: AttSchedule.tableName + '.schedule_id'
        }
      },
      'timetype': {
        relation: HasOneRelation,
        modelClass: AttTimetype,
        join: {
          from: this.tableName + '.timetype_id',
          to: AttTimetype.tableName + '.timetype_id'
        }
      }
    }
  }
}

