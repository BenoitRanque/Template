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
      resource_id: {
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
      }
    }
  },
  relationss: () => {
    const Resource = require('./Resource')
    return {
      resource: {
        relation: BelongsToOneRelation,
        modelClass: Resource,
        join: {
          from: 'core_privileges.resource_id',
          to: 'core_resources.resource_id'
        }
      }
    }
  },
  filters: {
    name: (query, value) => query.where({ 'privilege_name': value }),
    privilege_id: (query, value) => query.where({ 'privilege_id': value })
  }
})
