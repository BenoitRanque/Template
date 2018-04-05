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
      
      let params = {};
      user_id && params[user_id];
      username && params[username];
      return params
    })
    // resolve2: async (parent, args, context, info) => {
    //   // TODO authorize query
    //   let [user] = await knex(TABLE).select()
    //   return user
    // }
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
    resolve: new UserResolver('read:any', 'getUsersWhere', (parent, { user_id, username }) => {
      
      if (user_id === undefined && username === undefined) throw new Error('At least one of username or user_id is required')
      
      let params = {};
      user_id && params[user_id];
      username && params[username];
      return params
    })
    // resolve: async (parent, args, context, info) => {
    //   // TODO authorize query
    //   let users

    //   if (isEmpty(args)) {
    //     users = await knex(TABLE).select()
    //   }
    //   else {
    //     users = await knex(TABLE).where(args).select()
    //   }

    //   return users
    // }
  }
}