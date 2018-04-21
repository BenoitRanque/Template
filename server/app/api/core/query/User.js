const { GraphQLNonNull, GraphQLList, GraphQLString } = require('graphql')
const Resolver = require('@tools/resolver')
const { User } = require('../models')

module.exports = {
  users: Resolver.query(User, 'read:any', 'role'),
  user: Resolver.query(User, 'read:any', 'role.privileges.privilege', query => query.first())
}
