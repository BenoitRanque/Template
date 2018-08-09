const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model
const { formatDate, formatTime, parseDate, parseTime, parseInterval } = require('@tools/dateUtils')

module.exports = class HRAttScheduleUptime extends Model {
  static get tableName () { return 'hr_att_schedule_uptime' }
  static get idColumn () { return 'schedule_uptime_id' }
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
  async $beforeInsert (ctx) {
    this.created_at = new Date().toISOString();
    this.start_time ? this.start_time = formatTime(this.start_time) : null
    this.end_time ? this.end_time = formatTime(this.end_time) : null
  }

  async $beforeUpdate (ctx) {
    this.updated_at = new Date().toISOString();
    this.start_time ? this.start_time = formatTime(this.start_time) : null
    this.end_time ? this.end_time = formatTime(this.end_time) : null
  }
  
  async $afterGet (ctx) {
    this.start_time ? this.start_time = parseTime(this.start_time) : null
    this.end_time ? this.end_time = parseTime(this.end_time) : null
    this.value =  this.value ? Number(this.value) : 0
    return this
  }
}
