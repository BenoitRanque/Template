const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt, GraphQLNonNull } = require('graphql')
const bcrypt = require('bcrypt')
const knex = require('@db/knex')

module.exports = {
  session: {
    type: new GraphQLObjectType({
      name: 'CoreSessionMutation',
      description: 'Core Module Mutations',
      fields: () => ({
        login: {
          type: require('./schema'),
          args: {
            username: {
              type: new GraphQLNonNull(GraphQLString),
            },
            password: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve: async (parent, { username, password }, { session }) => {

            let [user] = await knex.where({ username }).from('core_users').select()
            if (!user) throw new Error(401)
            
            let auth = await bcrypt.compare(password, user.password)
            if (!auth) throw new Error(401)

            session.user = user
            
            return session
          }
        },
        logout: {
          type: require('./schema'),
          args: {
            // username: {
            //   type: new GraphQLNonNull(GraphQLString),
            // },
            // password: {
            //   type: new GraphQLNonNull(GraphQLString)
            // }
          },
          resolve: (parent, args, context, info) => {
            console.log('resolving login')
            context.session.destroy()
            return context.session.user
          }
        }
      })
    }),
    resolve: (parent, args, context, info) => {
      console.log('resolving session')
      return context.session
    }
  }
}
