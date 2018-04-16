const router = require('express').Router()
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const AccessControl = require('@tools/accessControl')
const { ENV } = require('@config/server')

// router.use((req, res, next) => {
//   if (ENV === 'dev' && req.get('origin')) res.setHeader('Access-Control-Allow-Origin', req.get('origin'))
//   res.setHeader('Access-Control-Allow-Credentials', 'true')
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
//   next()
// })

const ac = new AccessControl()

const graphql = graphqlExpress((req, res, next) => {
  return {
    schema: require('./schema'),
    context: {
      session: req.session,
      ac: ac
    },
    rootValue: {
      // first arguemnt passed to
    },
    // formatError: error => {
    //   if (error.originalError && error.originalError.error_message) {
    //     error.original_message = error.originalError.error_message;
    //   }
    //   console.log(error)
    
    //   return error
    // },

    // a function applied to the parameters of every invocation of runQuery
    // formatParams?: Function,

    // * - (optional) validationRules: extra validation rules applied to requests
    // validationRules?: Array<ValidationRule>,

    // a function applied to each graphQL execution result
    // formatResponse?: Function

    // a custom default field resolver
    // fieldResolver?: Function

    // a boolean that will print additional debug logging if execution errors occur
    debug: ENV === 'dev' ? true : false
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
router.use('/graphiql', graphiqlExpress({ 
  endpointURL: '/graphql', // URL for the GraphQL POST endpoint this instance of GraphiQL serves
  // query?: String, // optional query to pre-populate the GraphiQL UI with
  // operationName?: String, // optional operationName to pre-populate the GraphiQL UI with
  // variables?: Object, // optional variables to pre-populate the GraphiQL UI with
  // result?: Object, // optional result to pre-populate the GraphiQL UI with
  // passHeader: "'Access-Control-Allow-Credentials': 'true'", // a string that will be added to the outgoing request header object (e.g "'Authorization': 'Bearer lorem ipsum'")
  // editorTheme?: String, // opt
}));

module.exports = router