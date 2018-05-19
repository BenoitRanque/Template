const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class CoreGroup extends Model {
  static get resourceName () { return 'CoreGroup' }
  static get tableName () { return 'core_groups' }
  static get idColumn () { return 'group_id' }
  static get jsonSchema () {
    return  {
      type: 'object',
      description: 'A Group of users',
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

