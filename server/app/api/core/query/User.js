const { GraphQLNonNull, GraphQLList, GraphQLString } = require('graphql')
const Resolver = require('@tools/resolver')
const { User } = require('../models')

module.exports = {
  users: {
    type: new GraphQLList(User.GraphQLType),
    resolve: new Resolver({
      action: 'read:any',
      model: User,
      method: ({ model }) => model.query()
    })
  },
  user: {
    type: User.GraphQLType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString), description: 'The user\'s unique id' }
    },
    resolve: new Resolver({
      action: 'read:any',
      model: User,
      method: ({ model, args }) => model.query().where({ user_id: args.id })
    })
  }
}
