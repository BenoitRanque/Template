const { GraphQLNonNull, GraphQLList, GraphQLString } = require('graphql')
const Resolver = require('@tools/resolver')
const { Role } = require('../models')

module.exports = {
  roles: {
    type: new GraphQLList(Role.getGraphQLType()),
    resolve: new Resolver({
      action: 'read:any',
      model: Role,
      method: ({ model }) => model.query()
    })
  },
  role: {
    type: Role.getGraphQLType(),
    args: {
      id: { type: new GraphQLNonNull(GraphQLString), description: 'The role\'s unique id' }
    },
    resolve: new Resolver({
      action: 'read:any',
      model: Role,
      method: ({ model, args }) => model.query().where({ role_id: args.id })
    })
  }
}