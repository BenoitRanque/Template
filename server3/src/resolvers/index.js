const { extractFragmentReplacements } = require('prisma-binding')

const resolvers = {
  Query: require('./Query'),
  Mutation: require('./Mutation'),
  AuthPayload: require('./AuthPayload'),
  Employee: require('./Employee')
}

module.exports = {
  resolvers,
  fragmentReplacements: extractFragmentReplacements(resolvers)
}
