const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql')
const UserResolver = require('./resource')


module.exports = {
  user: {
    type: require('./schema'),
    args: {
      user_id: {
        type: GraphQLString
      },
      username: {
        type: GraphQLString
      }
    },
    resolve: new UserResolver('read:any', 'getUserWhere', (parent, { user_id, username }) => {
      
      if (user_id === undefined && username === undefined) throw new Error('At least one of username or user_id is required')
      
      let where = {}
      if (user_id) where['user_id'] = user_id
      if (username) where['username'] = username
      return where
    })
  },
  users: {
    type: new GraphQLList(require('./schema')),
    args: {
      user_id: {
        type: GraphQLString
      },
      username: {
        type: GraphQLString
      }
    },
    resolve: new UserResolver({ 
      action: 'read:any',
      method: 'getUsersWhere',
      params: (parent, { user_id, username }) => ({ user_id, username })
    })
  }
}