const Resolver = require('@tools/resolver')
const { Role } = require('../models')

module.exports = {
  roles: Resolver.query(Role),
  role: Resolver.query(Role, query => query.first())
}