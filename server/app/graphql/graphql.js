const router = require('express').Router()
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const AccessControl = require('@app/services/ac')

const graphql = graphqlExpress((req, res, next) => {
  return {
    schema: require('./schema'),
    context: {
      session: req.session,
      ac: new AccessControl({
        getSession: session => session.user,
        getSessionRole: session => session.user.role,

      })
    }
  }
})

// The GraphQL endpoint
router.use('/graphql', require('express').json(), (req, res, next) => {
  graphql(req, res, next)
})

// router.use('/graphql', require('express').json(), graphqlExpress((req, res, next) => {
//   return {
//     schema: require('./schema'),
//     context: {
//       session: req.session
//     }
//   }
// }))

// GraphiQL, a visual editor for queries
router.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

module.exports = router