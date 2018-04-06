const knex = require('@db/knex')
const Resolver = require('@app/services/resolver')
const { isEmpty } = require('@services/utils')

const TABLE = 'core_users'
const RESOURCE = 'core_User'
const METHODS = {
  'getSessionUser': session => session.user,

  'getUserWhere': where => knex(TABLE).where(where).first(),


  'getUsersWhere': where => knex(TABLE).where(where).select(),

  'usersOptionalWhere': where => {
    if (!where || isEmpty(where)) return knex(TABLE).select()
    return knex('TABLE').where(where).select()
  },

  'usersOptionalWhere': where => {
    if (!where || isEmpty(where)) return knex(TABLE).select()
    return knex('TABLE').where(where).select()
  }
}

module.exports = class UserResolver {
  constructor (action, method, params) {
    return new Resolver (action, method, params, RESOURCE, METHODS)
  }
}
