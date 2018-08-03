const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model
const { formatDate, formatTime, parseDate, parseTime, parseInterval } = require('@tools/dateUtils')

module.exports = class HRAttThreshold extends Model {
  static get tableName () { return 'hr_att_threshold' }
  static get idColumn () { return 'threshold_id' }

  async $beforeInsert (ctx) {
    this.start_early ? this.start_early = formatTime(this.start_early) : null
    this.start_late ? this.start_late = formatTime(this.start_late) : null
    this.end_early ? this.end_early = formatTime(this.end_early) : null
    this.end_late ? this.end_late = formatTime(this.end_late) : null
  }
  
  async $beforeUpdate (ctx) {
    this.start_early ? this.start_early = formatTime(this.start_early) : null
    this.start_late ? this.start_late = formatTime(this.start_late) : null
    this.end_early ? this.end_early = formatTime(this.end_early) : null
    this.end_late ? this.end_late = formatTime(this.end_late) : null
  }
  
  async $afterGet (ctx) {
    this.start_early ? this.start_early = parseInterval(this.start_early) : null
    this.start_late ? this.start_late = parseInterval(this.start_late) : null
    this.end_early ? this.end_early = parseInterval(this.end_early) : null
    this.end_late ? this.end_late = parseInterval(this.end_late) : null
    return this
  }
}