const knex = require('@db/knex')
const resolver = require('@app/services/resolver')
const { isEmpty } = require('@services/utils')

const TABLE = 'core_users'
const RESOURCE = 'core_User'
const PROMISES = {
  ['getSessionUser']: async session => session.user,

  ['getUserWhere']: async where => knex(TABLE).where(where).first(),


  ['getUsersWhere']: async where => knex(TABLE).where(where).select(),

  ['usersOptionalWhere']: async where => {
    if (!where || isEmpty(where)) return knex(TABLE).select()
    return knex('TABLE').where(where).select()
  },

  ['usersOptionalWhere']: async where => {
    if (!where || isEmpty(where)) return knex(TABLE).select()
    return knex('TABLE').where(where).select()
  }
}

module.exports = class UserResolver extends resolver {
  constructor (action, promise, params) {
    super (action, promise, params, RESOURCE, PROMISES)
  }
}
