const { GraphQLSchema } = require('graphql')
const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql')

module.exports = new GraphQLSchema({
  description: 'a test schema',
  query: require('./query/'),
  mutation: require('./mutation/')
})