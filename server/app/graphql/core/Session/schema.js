const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt, GraphQLNonNull } = require('graphql')
const SessionResolver = require('./resource')

module.exports = new GraphQLObjectType({
  name: 'Session',
  description: 'The current session',
  fields: () => ({
    user: {
      type: new GraphQLNonNull(new GraphQLObjectType({
        name: 'SessionUser',
        description: 'The current session\'s user',
        fields: () => ({
          user_id: {
            type: new GraphQLNonNull(GraphQLString)
          },
          username: {
            type: GraphQLString
          },
          role: {
            type: new GraphQLList(require('../Role/schema'))
          }
        })
      }))
    }
  }),
  resolve: new SessionResolver('read:own', 'getSession', (parent, args, { session }) => session)
})