const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, BCRYPT_SALT_ROUNDS } = require('../utils')

async function createUser(obj, args, ctx, info) {
  const password = await bcrypt.hash(args.data.password, BCRYPT_SALT_ROUNDS)
  return ctx.db.mutation.createUser({
    data: { ...args.data, password },
  }, info)
}

async function authenticate(obj, args, ctx, info) {
  const user = await ctx.db.query.user({ where: { username: args.username } }, `{ id password role }`)
  if (user) {
    const valid = await bcrypt.compare(args.password, user.password)
    if (valid) {
      return {
        user,
        token: jwt.sign({ user: { id: user.id, role: user.role } }, APP_SECRET)
      }
    }
  }
  throw new Error('No se pudo Iniciar Session')
}

async function createException(parent, { data }, ctx, info) {

  const userId = ctx.session.user.id
  const employeeId = data.employee.id
  const exceptionDates = data.slots.map(({ date }) => date)

  const userIsSupervisor = await ctx.db.exists.Employee({
    id: employeeId,
    department: {
      supervisors_some: {
        id: userId
      }
    }
  })
  if (!userIsSupervisor) throw new Error('User is not an authorized supervisor of employee')

  const exceptionsWithDuplicateDates = await ctx.db.exists.Exception({
    employee: {
      id: employeeId
    },
    slots_some: {
      date_in: exceptionDates
    }
  })
  if (exceptionsWithDuplicateDates) throw new Error('Conflict with other exceptions: dates already exist')

  return ctx.db.mutation.createException({
    data: {
      owner: {
        connect: {
          id: userId
        }
      },
      employee: {
        connect: {
          id: employeeId
        }
      },
      slots: {
        create: data.slots.map(({ date, schedule }) => ({
          date,
          schedule: {
            connect: !schedule.connect ? null : schedule.connect,
            create: !schedule.create ? null : {
              ...schedule.create,
              restline: {
                create: schedule.create.restline
              },
              timeline: {
                create: schedule.create.timeline
              }
            }
          }
        }))
      }
    }
  }, info)
}


module.exports = {
  createUser,
  authenticate,
  createException,
  createEmployee: (parent, args, ctx, info) => ctx.db.mutation.createEmployee(args, info),
  updateEmployee: (parent, args, ctx, info) => ctx.db.mutation.updateEmployee(args, info),
  createSchedule: (parent, args, ctx, info) => ctx.db.mutation.createSchedule(args, info),
  createShift: (parent, args, ctx, info) => ctx.db.mutation.createShift(args, info),
  updateShift: (parent, args, ctx, info) => ctx.db.mutation.updateShift(args, info),
  deleteShift: (parent, args, ctx, info) => ctx.db.mutation.deleteShift(args, info),
  createDepartment: (parent, args, ctx, info) => ctx.db.mutation.createDepartment(args, info),
  updateDepartment: (parent, args, ctx, info) => ctx.db.mutation.updateDepartment(args, info),
  deleteDepartment: (parent, args, ctx, info) => ctx.db.mutation.deleteDepartment(args, info)
}
