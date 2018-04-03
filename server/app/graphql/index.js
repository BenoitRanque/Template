const router = require('express').Router()
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')

// The GraphQL endpoint
router.use('/graphql', require('express').json(), graphqlExpress((req, res, next) => {
  return {
    schema: require('./schema'),
    context: {
      session: req.session
    }
  }
}))

// GraphiQL, a visual editor for queries
router.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

module.exports = router