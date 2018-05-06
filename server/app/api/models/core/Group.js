const BaseModel = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = BaseModel

module.exports = class UserGroup extends BaseModel {
  static get tableName() { return 'core_groups' }
  static get idColumn() { return 'group_id' }
  static get name() { return 'CoreGroup' }
  static get resource() { return this.name }
  static get jsonSchema () {
    return {
      name: this.name,
      description: 'A Group of users',
      type: 'object',
      properties: {
        'group_id': { type: 'string' },
        'group_name': { type: 'string' },
        'group_owner_id': { type: 'string' },
        'description': { type: 'string' }
      }
    }
  }
  static get relationMappings () {
    const User = require('./User')
    return {
      'group_owner': {
        relation: BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'core_groups.group_owner_id',
          to: 'core_users.user_id'
        }
      },
      'group_members': {
        relation: ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'core_groups.group_id',
          through: {
            from: 'core_user_groups.group_id',
            to: 'core_user_groups.user_id'
          },
          to: 'core_users.user_id'
        }
      }
    }
  }
}