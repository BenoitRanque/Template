const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'CoreUser',
  description: 'An user of the core module',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: (parent, args, context, resolveInfo) => {
        console.log('resolving id')
        return parent.id
      }
    },
    email: {
      type: GraphQLString,
      resolve: (parent, args, context, resolveInfo) => {
        console.log('resolving email')
        return parent.id
      }
    },
    idEncoded: {
      description: 'The ID base-64 encoded',
      type: GraphQLString,
      resolve: user => toBase64(user.idEncoded)
    },
    fullname: {
      description: 'A user\'s first and last name',
      type: GraphQLString,
      resolver: user => user.fullname
    }
  })
})