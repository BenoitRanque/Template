const isBefore = require('date-fns/is_before')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, BCRYPT_SALT_ROUNDS } = require('../utils')

async function createUser(obj, args, ctx, info) {
  args.data.password = await bcrypt.hash(args.data.password, BCRYPT_SALT_ROUNDS)
  return ctx.db.mutation.createUser(args, info)
}

async function updateUser(obj, args, ctx, info) {
  if (args.data && args.data.password !== undefined) {
    args.data.password = await bcrypt.hash(args.data.password === null ? '' : args.data.password, BCRYPT_SALT_ROUNDS)
  }
  return ctx.db.mutation.updateUser(args, info)
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

async function createExceptionAuthorization (obj, { data }, ctx, info) {
  return ctx.db.mutation.createExceptionAuthorization({
    data: {
      ...data,
      exception: {
        connect: {
          id: data.exception.id
        }
      },
      owner: {
        connect: {
          id: ctx.session.user.id
        }
      }
    }
  }, info)
}

async function createShift(obj, { data }, ctx, info) {
  const userId = ctx.session.user.id
  const employeeId = data.employee.id

  if (data.endDate && isBefore(data.endDate, data.startDate)) throw new Error('Fecha final debe ser nula o posterior a fecha inicial')

  return ctx.db.mutation.createShift({
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
      startDate: data.startDate,
      endDate: data.endDate ? data.endDate : null,
      slots: {
        create: data.slots.map(({ index, schedule }) => ({
          index,
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

async function updateShift (obj, { where, data }, ctx, info) {
  const userId = ctx.session.user.id

  const oldShift = await ctx.db.query.shift({ where }, `
    {
      startDate
      endDate
      slots {
        id
        index
        schedule {
          id
        }
      }
    }
  `)

  const newStartDate = data.startDate !== undefined ? data.startDate : oldShift.startDate
  const newEndDate = data.endDate !== undefined ? data.endDate : oldShift.endDate

  if (newEndDate && isBefore(newEndDate, newStartDate)) throw new Error('Fecha final debe ser nula o posterior a fecha inicial')

  const newShift = {
    owner: {
      connect: {
        id: userId
      }
    }
  }

  if (data.employee !== undefined) newShift.employee = { connect: data.employee }
  if (data.description !== undefined) newShift.description = data.description
  if (data.startDate !== undefined) newShift.startDate = data.startDate
  if (data.endDate !== undefined) newShift.endDate = data.endDate

  if (data.slots !== undefined) {
    newShift.slots = {
      delete: oldShift.slots.map(({ id }) => ({ id })),
      create: data.slots.map(({ index, schedule }) => ({
        index,
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

  return ctx.db.mutation.updateShift({ where, data: newShift }, info)
}

module.exports = {
  createUser,
  updateUser,
  authenticate,
  createException,
  createShift,
  updateShift,
  deleteShift: async (parent, args, ctx, info) => {
    // workaround: cannot return relations on delete mutation
    const response = await ctx.db.query.shift(args, info)
    await ctx.db.mutation.deleteShift(args, `{ id }`)
    return response
  },
  createExceptionAuthorization,
  createEmployee: (parent, args, ctx, info) => ctx.db.mutation.createEmployee(args, info),
  updateEmployee: (parent, args, ctx, info) => ctx.db.mutation.updateEmployee(args, info),
  createSchedule: (parent, args, ctx, info) => ctx.db.mutation.createSchedule(args, info),
  createDepartment: (parent, args, ctx, info) => ctx.db.mutation.createDepartment(args, info),
  updateDepartment: (parent, args, ctx, info) => ctx.db.mutation.updateDepartment(args, info),
  deleteDepartment: (parent, args, ctx, info) => ctx.db.mutation.deleteDepartment(args, info)
}
