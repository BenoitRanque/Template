const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...require('./core')
  })
})