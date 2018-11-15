

(async () => {
  try {
    const prisma = require('../../src/prisma')

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



