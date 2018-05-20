const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class CorePrivilege extends Model {
  static get resourceName () { return 'CorePrivilege' }
  static get tableName () { return 'core_privileges' }
  static get idColumn () { return 'privilege_id' }
  static get jsonSchema () {
    return  {
      type: 'object',
      description: 'A privilege of the core module',
      required: ['action', 'possession', 'resource_id'],
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
    }
  }
  static get jsonAttributes() {
    // disable automatic JSON formating for attributes array, store as POSTGRESQL array instead
    return []
  }
  static get relationMappings () {
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
  }
}

