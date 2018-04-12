const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql')
const Resolver = require('@tools/resolver')

module.exports = {
  type: new GraphQLObjectType({
    name: 'CoreQuery',
    description: 'Core Module Queries',
    fields: () => ({
      ...require('./Session'),
      ...require('./User'),
      ...require('./Role'),
      ...require('./Privilege')
    })
  }),
  resolve: (parent, args, context, info) => {
    return {}
  }
}
