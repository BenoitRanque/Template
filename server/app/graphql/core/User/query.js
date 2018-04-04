const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql')
const knex = require('@db/knex')
// const ac = require('@app/services/ac')
const isEmpty = require('@app/services/isEmpty')

const TABLE = 'core_users'


module.exports = {
  user: {
    type: require('./schema'),
    args: {
      id: {
        type: GraphQLString
      },
      username: {
        type: GraphQLString
      }
    },
    resolve: async (parent, args, context, info) => {
      // TODO authorize query
      console.log(args)
      console.log(info)
      let [user] = await knex(TABLE).select()
      return user
    }
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
    resolve: async (parent, args, context, info) => {
      // TODO authorize query
      let users

      if (isEmpty(args)) {
        users = await knex(TABLE).select()
      }
      else {
        users = await knex(TABLE).where(args).select()
      }

      return users
    }
  }
}