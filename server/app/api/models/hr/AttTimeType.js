const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model
const { formatDate, formatTime, parseDate, parseTime, parseInterval } = require('@tools/dateUtils')

module.exports = class HRAttTimeType extends Model {
  static get tableName () { return 'hr_att_timetype' }
  static get idColumn () { return 'timetype_id' }
}