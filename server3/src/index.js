const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const { resolvers, fragmentReplacements } = require('./resolvers')

const server = new GraphQLServer({
  typeDefs: './src/schema/index.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/schema/generated/prisma.graphql',
      fragmentReplacements,
      endpoint: process.env.PRISMA_ENDPOINT,
      secret: process.env.PRISMA_SECRET,
      debug: true
    })
  })
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
