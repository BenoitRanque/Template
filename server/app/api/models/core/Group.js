const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = require('objection').Model

module.exports = new Model({
  tableName: 'core_groups',
  idColumn: 'group_id',
  name: 'CoreGroup',
  description: 'A Group of users',
  resource: 'CoreGroup',
  schema: {
    type: 'object',
    properties: {
      'group_id': { type: 'string' },
      'group_name': { type: 'string' },
      'group_owner_id': { type: 'string' },
      'description': { type: 'string' }
    }
  },
  relations: () => {
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
  },
  filters: {
    own: (query, group_owner_id) => query.where({ group_owner_id })
  }
})
