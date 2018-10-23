

(async () => {
  try {
    const { Prisma } = require('prisma-binding')
    const db = new Prisma({
      typeDefs: 'src/schema/generated/prisma.graphql',
      endpoint: process.env.PRISMA_ENDPOINT,
      secret: process.env.PRISMA_SECRET,
      debug: false
    })

    const admin = await db.mutation.createUser({
      data: {
        username: 'admin',
        password: '$2a$10$8yYqN2d1j/OgdX6uIuoZm.pM90xBG7PmcY7CLi2fxN41vdnviovVC' // password is 'admin'
      }
    }, `{ id username }`)

    const schedules = await require('./schedules')(db)

    const employees = await require('./employees')(db, schedules, admin)

    const options = await require('./options')(db)

  } catch (error) {
    console.error(error)
  }
})()



