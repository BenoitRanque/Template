const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class CoreModule extends Model {
  static get resourceName () { return 'CoreModule' }
  static get tableName () { return 'core_modules' }
  static get idColumn () { return 'module_id' }
  static get jsonSchema () {
    return  {
      type: 'object',
      description: 'A module of the aplication',
      properties: {
        module_id: { type: 'string' },
        description: { type: 'string' }
      }
    }
  }
}

