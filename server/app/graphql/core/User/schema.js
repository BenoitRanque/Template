const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql')
const RoleResolver = require('../Role/resource')

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
    role: {
      type: new GraphQLList(require('../Role/schema')),
      resolve: new RoleResolver({
        action: 'read:any',
        method: 'byId',
        params: user => user.user_id
      })
    }
  })
})