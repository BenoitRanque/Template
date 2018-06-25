const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class HRAttType extends Model {
  static get tableName () { return 'hr_att_type' }
  static get idColumn () { return 'type_id' }
}