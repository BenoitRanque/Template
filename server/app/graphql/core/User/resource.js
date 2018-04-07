const Resolver = require('@services/resolver')
const knex = require('@db/knex')
const { isEmpty } = require('@services/utils')

const TABLE = 'core_users'
const RESOURCE = 'core_User'
const METHODS = {
  'getUserWhere': where => knex(TABLE).where(where).first(),

  'getUsersWhere': where => knex(TABLE).where(where).select(),

  'usersOptionalWhere': (where) => {
    Object.keys(where).forEach(key => {
      if (where[key] === undefined) delete where[key]
    })
    if (!where || isEmpty(where)) return knex(TABLE).first()
    return knex(TABLE).where(where).select()
  },

  'usersOptionalWhere': where => {
    if (!where || isEmpty(where)) return knex(TABLE).select()
    return knex('TABLE').where(where).select()
  },

  'getUserById': user_id => {
    if (!user_id) return null
    return knex(TABLE).where({ user_id }).first()
  },
  'getUsersById': user_id => {
    if (!user_id) return null
    return knex(TABLE).where({ user_id }).first()
  }
}

module.exports = class UserResolver {
  constructor (options) {
    return new Resolver (options, RESOURCE, METHODS)
  }
}
