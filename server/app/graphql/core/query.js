const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql')

module.exports = {
  type: new GraphQLObjectType({
    name: 'CoreQuery',
    description: 'Core Module Queries',
    fields: () => ({
      ...require('./User/query'),
      ...require('./Session/query')
    })
  }),
  resolve: () => {
    console.log('resolving core')
    return {}
  }
}
