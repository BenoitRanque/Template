const BaseModel = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = BaseModel

module.exports = class User extends BaseModel {
  static get tableName() { return 'core_users' }
  static get idColumn() { return 'user_id' }
  static get name() { return 'CoreUser' }
  static get resource() { return this.name }
  static get jsonSchema () {
    return {
      name: this.name,
      description: 'A User of the core module',
      type: 'object',
      required: ['username'],
      properties: {
        'user_id': { type: 'string' },
        'username': { 
          description: 'a unique user identifier',
          type: 'string'
        },
        'password': { type: 'string' },
        'description': { type: 'string' }
      }
    }
  }
  static get relationMappings () {
    const Role = require('./Role')
    return {
      'role': {
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
  }
  static get queryFilters() {
    return {
      id: {
        type: 'string',
        description: 'Filter by User ID',
        method: (query, value) => query.where({ 'user_id': value })
      },
      username: {
        type: 'string',
        description: 'Filter by Username',
        method: (query, value) => query.where({ 'username': value })
      }
    }
  }

  static get resolvers () {
    return {
      password: () => null
    }
  }
}

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