const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model
const { formatDate, formatTime, parseDate, parseTime, parseInterval } = require('@tools/dateUtils')

module.exports = class HRAttType extends Model {
  static get tableName () { return 'hr_att_type' }
  static get idColumn () { return 'type_id' }

  async $beforeInsert (ctx) {
    this.created_at = new Date().toISOString();
    this.start_early_threshold ? this.start_early_threshold = formatTime(this.start_early_threshold) : null
    this.start_late_threshold ? this.start_late_threshold = formatTime(this.start_late_threshold) : null
    this.end_early_threshold ? this.end_early_threshold = formatTime(this.end_early_threshold) : null
    this.end_late_threshold ? this.end_late_threshold = formatTime(this.end_late_threshold) : null
  }
  
  async $beforeUpdate (ctx) {
    this.updated_at = new Date().toISOString();
    this.start_early_threshold ? this.start_early_threshold = formatTime(this.start_early_threshold) : null
    this.start_late_threshold ? this.start_late_threshold = formatTime(this.start_late_threshold) : null
    this.end_early_threshold ? this.end_early_threshold = formatTime(this.end_early_threshold) : null
    this.end_late_threshold ? this.end_late_threshold = formatTime(this.end_late_threshold) : null
  }
  
  async $afterGet (ctx) {
    this.start_early_threshold ? this.start_early_threshold = parseTime(this.start_early_threshold) : null
    this.start_late_threshold ? this.start_late_threshold = parseTime(this.start_late_threshold) : null
    this.end_early_threshold ? this.end_early_threshold = parseTime(this.end_early_threshold) : null
    this.end_late_threshold ? this.end_late_threshold = parseTime(this.end_late_threshold) : null
    return this
  }
}