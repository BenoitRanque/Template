const Resolver = require('@tools/resolver')
const { GraphQLObjectType } = require('graphql')
const { User } = require('../models')

module.exports = {
  user: {
    type: new GraphQLObjectType({
      name: 'CoreUserMutation',
      description: 'Core User Mutations',
      fields: () => ({
        create: {
          type: User.GraphQLType,
          args: {
            input: {
              type: User.GraphQLInputType
            }
          },
          resolve: new Resolver({
            model: User,
            action: 'create:any',
            method: ({ model, args }) => {
              let user = new model(args.input)
              console.log(user)
              return user
            }
          })
        }
      })
    }),
    resolve: () => ({})
  }
}