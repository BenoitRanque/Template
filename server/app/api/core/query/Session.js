const { User } = require('../models')
const Resolver = require('@tools/resolver')

module.exports = {
  session: {
    type: User.getGraphQLType(),
    resolve: new Resolver({
      authorize: false,
      model: User,
      method: (model, { context }) => context.session.user
    })
  }
}
