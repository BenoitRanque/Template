

(async () => {
  try {
    const prisma = require('../../src/prisma')
    const { syncEvents } = require('../../src/utils')

    const scheduleCategoryConfig = await require('./scheduleCategoryConfig')(prisma)
    const options = await require('./options')(prisma)

    const roles = await require('./roles')(prisma)
    const users = await require('./users')(prisma, roles)
    const schedules = await require('./schedules')(prisma)
    const departments = await require('./departments')(prisma, users)
    const employees = await require('./employees')(prisma, users, schedules, departments)
    // const events = await syncEvents('2018-11-01T04:00:00.000Z', '2018-11-30T04:00:00.000Z', prisma)

  } catch (error) {
    console.error(error)
  }
})()



