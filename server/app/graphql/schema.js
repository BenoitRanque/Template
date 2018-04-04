const { GraphQLSchema } = require('graphql')
const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql')

module.exports = new GraphQLSchema({
  description: 'a test schema',
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      core: require('./core/query')
    })
  }),
  mutation:  new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      core: require('./core/mutation')
    })
  })
})
