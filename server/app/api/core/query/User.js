const { GraphQLNonNull, GraphQLList, GraphQLString } = require('graphql')
const Resolver = require('@tools/resolver')
const { User } = require('../models')

module.exports = {
  users: Resolver.query(User),
  user: Resolver.query(User, query => query.first())
}
