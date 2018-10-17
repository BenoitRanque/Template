

(async () => {
  try {
    const { Prisma } = require('prisma-binding')
    const db = new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: process.env.PRISMA_ENDPOINT,
      secret: process.env.PRISMA_SECRET,
      debug: true
    })

    const admin = await db.mutation.createUser({
      data: {
        username: 'admin',
        password: '$2a$10$8yYqN2d1j/OgdX6uIuoZm.pM90xBG7PmcY7CLi2fxN41vdnviovVC' // password is 'admin'
      }
    }, `{ id username }`)

    const schedules = await require('./schedules')(db)

    const employees = await require('./employees')(db, schedules, admin)

  } catch (error) {
    console.error(error)
  }
})()



