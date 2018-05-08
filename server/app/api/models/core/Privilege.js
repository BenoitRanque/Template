const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = require('objection').Model

module.exports = new Model({
  tableName: 'core_privileges',
  idColumn: 'privilege_id',
  name: 'CorePrivilege',
  description: 'A privilege of the core module',
  resource: 'CorePrivilege',
  schema: {
    type: 'object',
    required: ['privilege_id'],
    properties: {
      privilege_id: {
        type: 'string'
      },
      privilege_name: {
        type: 'string'
      },
      description: {
        type: 'string'
      },
      module_id: {
        type: 'string'
      },
      resource: {
        description: 'Resource to be accessed using this privilege',
        type: 'string'
      },
      action: {
        type: 'string',
        description: 'Action to be performed on resource using this privilege',
        enum: [
          'read',
          'create',
          'update',
          'delete'
        ],
      },
      possession: {
        type: 'string',
        description: 'Posession required for this privilege',
        enum: [
          'any',
          'own'
        ],
      },
      attributes: {
        type: 'array',
        items: { type: 'string' }
      },
      module_id: { type: 'string' }
    }
  },
  relationss: () => {
    const Module = require('./Module')
    return {
      module: {
        relation: BelongsToOneRelation,
        modelClass: Module,
        join: {
          from: 'core_privileges.module_id',
          to: 'core_modules.module_id'
        }
      }
    }
  },
  filters: {
    name: (query, value) => query.where({ 'privilege_name': value }),
    privilege_id: (query, value) => query.where({ 'privilege_id': value })
  }
})
