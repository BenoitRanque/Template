

(async () => {
  try {
    const { Prisma } = require('prisma-binding')
    const db = new Prisma({
      typeDefs: 'src/schema/generated/prisma.graphql',
      endpoint: process.env.PRISMA_ENDPOINT,
      secret: process.env.PRISMA_SECRET,
      debug: false
    })

    const users = await require('./users')(db)
    const schedules = await require('./schedules')(db)
    const departments = await require('./departments')(db, users)
    const employees = await require('./employees')(db, users, schedules, departments)
    const options = await require('./options')(db)

  } catch (error) {
    console.error(error)
  }
})()



