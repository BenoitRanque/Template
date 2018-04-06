const knex = require('@db/knex')
const Resolver = require('@app/services/resolver')
const { isEmpty } = require('@services/utils')

const TABLE = 'core_users'
const RESOURCE = 'core_User'

module.exports = class UserResolver extends Resolver {
  constructor (action, method, params) {
    return super (action, method, params, RESOURCE)
    // return new Resolver(action, promise, params, RESOURCE, PROMISES)
  }

  static methods () {
    return {
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
  }
}
