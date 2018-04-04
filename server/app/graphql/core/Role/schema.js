const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql')
const knex = require('@db/knex')
module.exports = new GraphQLObjectType({
  name: 'CoreRole',
  description: 'A custom user role',
  fields: () => ({
    role_id: {
      type: GraphQLString
    },
    role_name: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    extends: {
      type: new GraphQLList(require('./schema')),
      resolve: ({ role_id }, args, context, info) => knex
        .where({ 'core_role_extend.extended_role_id': role_id })
        .select(['core_roles.role_id', 'core_roles.role_name', 'core_roles.description'])
        .from('core_role_extend')
        .leftJoin('core_roles', 'core_role_extend.base_role_id', 'core_roles.role_id')
    }
  })
})