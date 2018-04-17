const Resolver = require('@tools/resolver')
const { User } = require('../models')

module.exports = {
  session: {
    type: User.GraphQLType,
    resolve: new Resolver({
      authorize: false,
      model: User ,
      method: ({ model, context }) => context.session.user
    })
  }
}
