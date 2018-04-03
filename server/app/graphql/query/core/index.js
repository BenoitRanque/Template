const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql')

module.exports = {
  core: {
    type: new GraphQLObjectType({
      name: 'CoreQuery',
      description: 'Core Module Queries',
      fields: () => ({
        users: {
          type: new GraphQLList(require('../../resource/core/User')),
          resolve: (parent, args, context, resolveInfo) => {
            console.log('resolving users')
            return [
              {
                fullname: 'user 1', id: 1
              },
              {
                fullname: 'user 2', id: 4
              },
              {
                fullname: 'user 3', id: 6
              }
            ]
          }
        },
        user: {
          type: require('../../resource/core/User'),
          resolve: (parent, args, context, resolveInfo) => {
            await accessControl('User', )
            console.log('resolving user')
            return { fullname: 'benoit', email: 'string', id: 2 }
          }
          // resolve: () => {
          //   // throw new Error(401)
          //   return [
          //     { fullname: 'hi', id: 3 },
          //     {
          //       fullname: 'baz', id: 2
          //     }
          //   ]
          // }
        }
      })
    }),
    resolve: () => {
      console.log('resolving core')
      return {}
    }
    // resolve: (parent, args, context, resolveInfo) => {
    //   return [ parent, args, context, resolveInfo ]
    // }
  }
}