const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = require('objection').Model

module.exports = new Model({
  tableName: 'core_modules',
  idColumn: 'module_id',
  name: 'Module',
  description: 'A module of the aplication',
  resource: 'Module',
  schema: {
    type: 'object',
    properties: {
      module_id: { type: 'string' },
      description: { type: 'string' }
    }
  }
})
