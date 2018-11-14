

(async () => {
  try {
    const { Prisma } = require('prisma-binding')
    const prisma = {
      client: require('../../src/schema/generated/prisma-client/index.js'),
      bindings: new Prisma({
        typeDefs: 'src/schema/generated/prisma.graphql',
        endpoint: process.env.PRISMA_ENDPOINT,
        secret: process.env.PRISMA_SECRET,
        debug: false
      })
    }
    const scheduleCategoryConfig = await require('./scheduleCategoryConfig')(prisma)
    const options = await require('./options')(prisma)

    const roles = await require('./roles')(prisma)
    const users = await require('./users')(prisma, roles)
    const schedules = await require('./schedules')(prisma)
    const departments = await require('./departments')(prisma, users)
    const employees = await require('./employees')(prisma, users, schedules, departments)

  } catch (error) {
    console.error(error)
  }
})()



