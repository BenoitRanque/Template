const BaseModel = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = BaseModel

module.exports = class Privilege extends BaseModel {
  static get tableName() {
    return 'core_privileges'
  }
  static get idColumn() {
    return 'privilege_id'
  }

  static get name() {
    return 'CorePrivilege'
  }

  static get resource() {
    return this.name
  }

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
          description: 'Optional description',
          type: 'string'
        },
        action: {
          type: 'string',
          name: 'CorePrivilegeAction',
          description: 'possible action',
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
          items: [
            {
              name: 'ReadAny',
              value: 'read:any',
              description: 'Read Resource with any ownership'
            },
            {
              name: 'CreateAny',
              value: 'create:any',
              description: 'Create Resource with any ownership'
            },
            {
              name: 'UpdateAny',
              value: 'update:any',
              description: 'Update Resource with any ownership'
            },
            {
              name: 'DeleteAny',
              value: 'delete:any',
              description: 'Delete Resource with any ownership'
            },
            {
              name: 'ReadOwn',
              value: 'read:own',
              description: 'Read Resource with own ownership'
            },
            {
              name: 'CreateOwn',
              value: 'create:own',
              description: 'Create Resource with own ownership'
            },
            {
              name: 'UpdateOwn',
              value: 'update:own',
              description: 'Update Resource with own ownership'
            },
            {
              name: 'DeleteOwn',
              value: 'delete:own',
              description: 'Delete Resource with own ownership'
            }
          ]
        }
      }
    }
  }

  static get relationMappings() {
    return {
      attributes: {
        relation: HasManyRelation,
        modelClass: require('./PrivilegeAttribute'),
        join: {
          from: 'core_privileges.privilege_id',
          to: 'core_privilege_attributes.privilege_id'
        }
      }
    }
  }
}