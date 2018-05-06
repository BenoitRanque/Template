const BaseModel = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = BaseModel

module.exports = class Privilege extends BaseModel {
  static get tableName() { return 'core_privileges' }
  static get idColumn() { return 'privilege_id' }
  static get name() { return 'CorePrivilege' }
  static get resource() { return this.name }

  static get jsonSchema () {
    return {
      description: 'A privilege of the core module',
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
          name: 'CorePrivilegeAction',
          description: 'Action to be performed on resource using this privilege',
          enum: [
            'read:any',
            'create:any',
            'update:any',
            'delete:any',
            'read:own',
            'create:own',
            'update:own',
            'delete:own'
          ],
          items: {
            'ReadAny': {
              value: 'read:any',
              description: 'Read Resource with any ownership'
            },
            'CreateAny': {
              value: 'create:any',
              description: 'Create Resource with any ownership'
            },
            'UpdateAny': {
              value: 'update:any',
              description: 'Update Resource with any ownership'
            },
            'DeleteAny': {
              value: 'delete:any',
              description: 'Delete Resource with any ownership'
            },
            'ReadOwn': {
              value: 'read:own',
              description: 'Read Resource with own ownership'
            },
            'CreateOwn': {
              value: 'create:own',
              description: 'Create Resource with own ownership'
            },
            'UpdateOwn': {
              value: 'update:own',
              description: 'Update Resource with own ownership'
            },
            'DeleteOwn': {
              value: 'delete:own',
              description: 'Delete Resource with own ownership'
            }
          }
        },
        attributes: {
          type: 'array',
          items: { type: 'string' }
        },
        module_id: { type: 'string' }
      }
    }
  }

  static get relationMappings() {
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
  }

  static get filters () {
    return {
      name: {
        type: 'string',
        method: (query, value) => query.where({ 'privilege_name': value })
      },
      id: {
        type: 'string',
        method: (query, value) => query.where({ 'privilege_id': value })
      }
    }
  }
}