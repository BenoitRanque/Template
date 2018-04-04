const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql')
const knex = require('@db/knex')

module.exports = new GraphQLObjectType({
  name: 'CoreUser',
  description: 'A user of the core module',
  fields: () => ({
    user_id: {
      type: GraphQLString,
      resolve: ({ user_id }, args, context, info) => user_id
    },
    username: {
      type: GraphQLString,
      resolve: user => user.username
    },
    password: {
      type: GraphQLString,
      resolve: () => null
    },
    role: {
      type: new GraphQLList(require('../Role/schema')),
      resolve: ({ user_id }, args, context, info) => knex
        .where({ 'core_user_roles.user_id': user_id })
        .select([ 'core_user_roles.role_id', 'core_user_roles.grantor_id', 'core_roles.role_name', 'core_roles.description' ])
        .from('core_user_roles')
        .leftJoin('core_roles', 'core_user_roles.role_id', 'core_roles.role_id')
    },
  })
})