const Resolver = require('@services/resolver')
const knex = require('@db/knex')
const bcrypt = require('bcrypt')
const { isEmpty } = require('@services/utils')

const RESOURCE = 'core_Session'
const METHODS = {
  'login': async (session, { username, password }) => {
    let user = await knex.where({ username }).from('core_users').first()
    if (!user) throw new Error(401)
    
    let auth = await bcrypt.compare(password, user.password)
    if (!auth) throw new Error(401)

    delete user.password

    user.role = await knex
      .where({ 'core_user_roles.user_id': user.user_id })
      .from('core_user_roles')
      .select(['core_roles.role_id', 'core_roles.role_name'])
      .leftJoin('core_roles', 'core_user_roles.role_id', 'core_roles.role_id')

    session.user = user

    return session
  },
  'logout': async (session) => {
    session.destroy()
    return null
  },
  'getSession': session => session
}

module.exports = class SessionResolver {
  constructor (options) {
    return new Resolver (options, RESOURCE, METHODS)
  }
}