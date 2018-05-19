const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class CoreResource extends Model {
  static get resourceName () { return 'CoreResource' }
  static get tableName () { return 'core_resources' }
  static get idColumn () { return 'resource_id' }
  static get jsonSchema () {
    return  {
      type: 'object',
      description: 'A Resource',
      properties: {
        'resource_id': { type: 'string' },
        'description': { type: 'string' },
        'module_id': { type: 'string' }
      }
    }
  }
  static get relationMappings () {
    const Module = require('./Module')
    return {
      'module': {
        relation: BelongsToOneRelation,
        modelClass: Module,
        join: {
          from: 'core_resource.module_id',
          to: 'core_modules.module_id'
        }
      }
    }
  }
}
