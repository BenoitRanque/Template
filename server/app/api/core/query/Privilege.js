const { GraphQLNonNull, GraphQLList, GraphQLString } = require('graphql')
const Resolver = require('@tools/resolver')
const { Privilege } = require('../models')

module.exports = {
  privileges: {
    type: new GraphQLList(Privilege.getGraphQLType()),
    resolve: new Resolver({
      action: 'read:any',
      model: Privilege,
      method: ({ model }) => model.query()
    })
  },
  privilege: {
    type: Privilege.getGraphQLType(),
    args: {
      id: { type: new GraphQLNonNull(GraphQLString), description: 'The privilege\'s unique id' }
    },
    resolve: new Resolver({
      action: 'read:any',
      model: Privilege,
      method: ({ model, args }) => model.query().where({ privilege_id: args.id })
    })
  },
  privileges: Resolver.query(Privilege),
  privilege: Resolver.query(Privilege, true)
}