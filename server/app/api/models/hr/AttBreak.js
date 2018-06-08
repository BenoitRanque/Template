const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class HRAttBreak extends Model {
  static get tableName () { return 'hr_att_break' }
  static get idColumn () { return 'break_id' }
}
