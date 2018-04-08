const Resolver = require('@services/resolver')
const knex = require('@db/knex')
const { isEmpty } = require('@services/utils')

const TABLE = 'core_users'
const RESOURCE = 'core_User'
const METHODS = {
  'UserById': user_id => {
    if (!user_id) return null
    return knex(TABLE).where({ user_id }).first()
  }
}

module.exports = class UserResolver {
  constructor (options) {
    return new Resolver (options, RESOURCE, METHODS)
  }
}
