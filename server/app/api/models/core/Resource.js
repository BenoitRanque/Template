const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = require('objection').Model

module.exports = new Model({
  tableName: 'core_resources',
  idColumn: 'resource_id',
  name: 'CoreResource',
  description: 'A Resource',
  resource: 'CoreResource',
  schema: {
    type: 'object',
    properties: {
      'resource_id': { type: 'string' },
      'description': { type: 'string' },
      'module_id': { type: 'string' }
    }
  },
  relations: () => {
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
  },
  filters: {}
})
