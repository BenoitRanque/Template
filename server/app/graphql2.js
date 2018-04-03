const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
// const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const graphqlHTTP = require('express-graphql');

const router = require('express').Router()

// let resources = [
//   'User',
//   'Session'
// ]

// let schema = []
// resources.forEach(r =>{
//   schema = schema.concat(require())
// })

// Some fake data
// const users = [
//   {
//     name: "Harry Potter and the Sorcerer's stone",
//     username: 'J.K. Rowling',
//   },
//   {
//     name: 'Jurassic Park',
//     username: 'Michael Crichton',
//   },
// ];

// // The GraphQL schema in string form
// const core_User = () => [`
//   type core_User { name: String, username: String, users: [core_User] }
// `]
// const Query = () => [ `
// type Query { users: [core_User] }
// `, User ]

// const Mutation = () => [`
// type Mutation { users: [core_User] }
// `, User ]

// const core = () => [Mutation, Query]

// const aux_User = () => [`
//   type core_User { name: String, username: String, users: [core_User] }
// `]
// const Query = () => [ `
// type Query { users: [core_User] }
// `, User ]

// const Mutation = () => [`
// type Mutation { users: [core_User] }
// `, User ]



// const typeDefs = [
//   `
//   type schema {
//     query: Query
//   }
//   `,
//   `
//   type Query {
//     version: String
//   }
//   `,
//   `
//   extend type Query {
//     core: Core
//   }
//   `,
//   `
//   type Core {
//     users: [Users]
//   }
//   `,
//   `
//   type Users {
//     username: String,
//     password: String
//   }
//   `
//   // require('./resources/core').typeDefs
// ]

// // The resolvers
// const resolvers = {
//   Query: {
//     version: () => '1.0',
//     core: {
//       users: {
//         fields
//       }
//       () => [
//         {
//           username: 'foo',
//           password: 'fuu'
//         },
//         {
//           username: 'bar',
//           password: 'baz'
//         }
//       ]
//     }
//   }
// }

// // Put together a schema
// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// })

const { GraphQLSchema } = require('graphql')
const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql')

// const User = new GraphQLObjectType({
//   name: 'User',
//   fields: () => ({
//     id: {
//       type: GraphQLInt
//     },
//     email: {
//       type: GraphQLString
//     },
//     idEncoded: {
//       description: 'The ID base-64 encoded',
//       type: GraphQLString,
//       resolve: user => toBase64(user.idEncoded)
//     },
//     fullName: {
//       description: 'A user\'s first and last name',
//       type: GraphQLString
//     }
//   })
// })

// const AuxUser = new GraphQLObjectType({
//   name: 'AuxUser',
//   fields: () => ({
//     id: {
//       type: GraphQLInt
//     },
//     email: {
//       type: GraphQLString
//     },
//     idEncoded: {
//       description: 'The ID base-64 encoded',
//       type: GraphQLString,
//       resolve: user => toBase64(user.idEncoded)
//     },
//     fullName: {
//       description: 'A user\'s first and last name',
//       type: GraphQLString
//     }
//   })
// })

// const core = {
//   description: 'Core module',
//   Query: new GraphQLObjectType({
//     name: 'CoreQuery',
//     description: 'Core Module Queries',
//     fields: () => ({
//       users: {
//         type: new GraphQLList(User),
//         resolve: () => {} // TODO
//       }
//     })
//   }),
//   Mutation: new GraphQLObjectType({
//     name: 'CoreMutations',
//     description: 'Core Module Mutations',
//     fields: () => ({
//       users: {
//         type: new GraphQLList(User),
//         resolve: () => {} // TODO
//       }
//     })
//   })
// }



const QueryRoot = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    // users: {
    //   type: new GraphQLList(User),
    //   resolve: () => {} // TODO
    // }
    ...require('./modules').map(m => {
      let { description, Query } = require(`./resources/${m}`)
      return {
        description, Query
      }
    })
  })
})
const MutationRoot = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // users: {
    //   type: new GraphQLList(User),
    //   resolve: () => {} // TODO
    // }
    ...require('./modules').map(m => {
      let { description, Mutation } = require(`./resources/${m}`)
      return {
        description, Mutation
      }
    })
  })
})

const schema = new GraphQLSchema({
  description: 'a test schema',
  query: QueryRoot,
  mutation: MutationRoot
})


// The GraphQL endpoint
router.use('/graphql', express.json(), graphqlExpress((req, res, next) => {
  return {
    schema,
    context: {
      session: req.session
    }
  }
}))

// GraphiQL, a visual editor for queries
router.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

module.exports = router