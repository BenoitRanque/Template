const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql')

module.exports = {
  core: {
    type: new GraphQLObjectType({
      name: 'CoreMutarion',
      description: 'Core Module Mutations',
      fields: () => ({
        users: {
          type: new GraphQLList(require('../../resource/core/User')),
          resolve: () => {
            throw new Error(401)
          } // TODO
        }
      })
    })
  }
}