const { GraphQLServer } = require('graphql-yoga')
const prisma = require('./prisma')
const { resolvers } = require('./resolvers')
const middlewares = require('./middlewares')

const server = new GraphQLServer({
  typeDefs: './src/schema/index.graphql',
  resolvers,
  middlewares, // disabled auth for development
  context: req => ({
    ...req,
    prisma
  })
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
