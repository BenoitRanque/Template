const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql')


module.exports = {
  description: 'Core Module',
  Query: new GraphQLObjectType({
    name: 'CoreMutation',
    fields: () => ({
      ...resources.map(resource => require(`./${resource}/Query`)),
      users: {
        type: new GraphQLList(User),
        resolve: () => {} // TODO
      }
    })
  }),
  Mutation: new GraphQLObjectType({
    name: 'CoreMutation',
    fields: () => ({
      ...resources.map(resource => require(`./${resource}/Mutation`)),
      users: {
        type: new GraphQLList(User),
        resolve: () => {} // TODO
      }
    })
  })
}