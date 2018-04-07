const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql')

module.exports = {
  type: new GraphQLObjectType({
    name: 'CoreMutation',
    description: 'Core Module Mutations',
    fields: () => ({
      ...require('./Session/mutation'),
      ...require('./Role/mutation'),
      ...require('./User/mutation')
    }),
  }),
  resolve: () => ({})
}
