const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model
const { formatDate, formatTime, parseDate, parseTime, parseInterval } = require('@tools/dateUtils')

module.exports = class HRAttTimetable extends Model {
  static get tableName () { return 'hr_att_timetable' }
  static get idColumn () { return 'timetable_id' }
  static get relationMappings () {
    const AttType = require('./AttType')
    return {
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
  async $beforeInsert (ctx) {
    console.log(this)
    this.created_at = new Date().toISOString();
    this.start_time ? this.start_time = formatTime(this.start_time) : null
    this.end_time ? this.end_time = formatTime(this.end_time) : null
    this.duration ? this.duration = formatTime(this.duration) : null
    console.log(this)
  }

  async $beforeUpdate (ctx) {
    console.log(this)
    this.updated_at = new Date().toISOString();
    this.start_time ? this.start_time = formatTime(this.start_time) : null
    this.end_time ? this.end_time = formatTime(this.end_time) : null
    this.duration ? this.duration = formatTime(this.duration) : null
    console.log(this)
  }
  
  async $afterGet (ctx) {
    console.log(this)
    this.start_time ? this.start_time = parseTime(this.start_time) : null
    this.end_time ? this.end_time = parseTime(this.end_time) : null
    this.duration ? this.duration = parseInterval(this.duration) : null
    console.log(this)
    return this
  }
}
