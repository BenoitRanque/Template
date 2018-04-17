const Resolver = require('@tools/resolver')
const { Privilege } = require('../models')

module.exports = {
  privileges: Resolver.query(Privilege),
  privilege: Resolver.query(Privilege, query => query.first())
}