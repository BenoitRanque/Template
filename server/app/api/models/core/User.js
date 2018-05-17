const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = require('objection').Model

module.exports = new Model({
  tableName: 'core_users',
  idColumn: 'user_id',
  name: 'CoreUser',
  description: 'A User of the core module',
  resource: 'CoreUser',
  schema: {
    type: 'object',
    required: ['username'],
    properties: {
      'user_id': { type: 'string' },
      'username': { 
        description: 'a unique user identifier',
        type: 'string'
      },
      'displayname': {
        type: 'string'
      },
      'password': { type: 'string' },
      'description': { type: 'string' }
    }
  },
  relations: () => {
    const Role = require('./Role')
    return {
      'role': {
        graph: {
          insert: false,
          upsert: false
        },
        relation: ManyToManyRelation,
        modelClass: Role,
        join: {
          from: 'core_users.user_id',
          through: {
            from: 'core_user_roles.user_id',
            to: 'core_user_roles.role_id'
          },
          to: 'core_roles.role_id'
        }
      }
    }
  },
  filters: {
    id: (query, user_id) => query.where({ user_id }),
    username: (query, username) => query.where({ username }),
    own: (query, user_id) => query.where({ user_id })
  }
})
