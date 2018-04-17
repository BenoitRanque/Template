const bcrypt = require('bcrypt')
const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLInputObjectType, GraphQLNonNull } = require('graphql')
const Resolver = require('@tools/resolver')
const { User } = require('../models')

module.exports = {
  login: {
    type: User.GraphQLType,
    args: {
      input: {
        type: new GraphQLNonNull(new GraphQLInputObjectType({
          name: 'LoginInput',
          fields: () => ({
            username: {
              type: new GraphQLNonNull(GraphQLString)
            },
            password: {
              type: new GraphQLNonNull(GraphQLString)
            }
          })
        }))
      }
    },
    resolve: new Resolver({
      authenticate: false,
      model: User,
      method: async ({ model, info, args, context }) => {
        let
          { username, password } = args.input,
          { session } = context

        let user = await model.query().where({ username }).eager('role').first()
        if (!user) throw new Error(401)

        let auth = await bcrypt.compare(password, user.password)
        if (!auth) throw new Error(401)

        delete user.password

        session.user = user
        
        return Resolver.eager(model, model.query().where({ user_id: user.user_id, }), info).first()
        // return model.query().where({ user_id: user.user_id }).eager(...model.getEager(info)).first()
      }
    })
  },
  logout: {
    type: User.GraphQLType,
    resolve: new Resolver({
      authorize: false,
      model: User,
      method: ({ model, context }) => {
        let user = context.session.user
        context.session.destroy()
        return user
      }
    })
  }
}
