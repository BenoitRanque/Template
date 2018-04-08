const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql')

module.exports = {
  type: new GraphQLObjectType({
    name: 'CoreQuery',
    description: 'Core Module Queries',
    fields: () => ({
      ...require('./Session/query'),
      ...require('./Role/query'),
      ...require('./User/query')
    })
  }),
  resolve: () => {
    return {}
  }
}
