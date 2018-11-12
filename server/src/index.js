const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const { resolvers, fragmentReplacements } = require('./resolvers')
const middlewares = require('./middlewares')

const client = require('./schema/generated/prisma-client')

const bindings = new Prisma({
  typeDefs: 'src/schema/generated/prisma.graphql',
  fragmentReplacements,
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: true
})

const server = new GraphQLServer({
  typeDefs: './src/schema/index.graphql',
  resolvers,
  middlewares, // disabled auth for development
  context: req => ({
    ...req,
    prisma: {
      bindings,
      client
    }
  })
})

server.start(() => console.log(`Server is running on http://localhost:4000`))