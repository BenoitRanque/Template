const BaseModel = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = BaseModel

module.exports = class PrivilegeAttributes extends BaseModel {
  static get tableName() { return 'core_privilege_attributes' }
  static get idColumn() { return ['privilege_id', 'attribute'] }
  static get name() { return 'CorePrivilegeAttribute' }
  static get resource() { return this.name }

  static get jsonSchema () {
    return {
      description: 'A possible atribute for a privilege of the core module',
      type: 'object',
      required: ['privilege_id'],

      properties: {
        privilege_id: {
          type: 'string'
        },
        attribute: {
          type: 'string'
        }
      }
    }
  }

  static get relationMappings() {
    return {
      privilege: {
        relation: BelongsToOneRelation,
        modelClass: require('./Privilege'),
        join: {
          from: 'core_privilege_attributes.privilege_id',
          to: 'core_privileges.privilege_id'
        }
      }
    }
  }
}