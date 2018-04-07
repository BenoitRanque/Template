const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt, GraphQLNonNull } = require('graphql')
const SessionResolver = require('./resource')

module.exports = {
  login: {
    type: require('./schema'),
    args: {
      username: {
        type: new GraphQLNonNull(GraphQLString),
      },
      password: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: new SessionResolver(null, 'login', (parent, args, { session }) => ([session, args]))
  },
  logout: {
    type: require('./schema'),
    resolve: new SessionResolver(null, 'logout', (parent, args, { session }) => session)
  }
}
