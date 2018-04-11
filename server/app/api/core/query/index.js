const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql')
const Resolver = require('@tools/resolver')

module.exports = {
  type: new GraphQLObjectType({
    name: 'CoreQuery',
    description: 'Core Module Queries',
    fields: () => ({
      ...require('./Session')
    })
  }),
  resolve: (parent, args, context, info) => {
    return {}
  }
}
