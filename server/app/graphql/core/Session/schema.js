const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'Session',
  description: 'The current user\'s session',
  fields: () => ({
    user: {
      type: require('../User/schema'),
      resolve: (parent, args, context, resolveInfo) => {
        console.log('resolving session user')
        return context.session.user || null
      }
    }
  }),
  resolve: (parent, args, contex) => contex.session
})