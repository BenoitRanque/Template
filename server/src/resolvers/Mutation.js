const isBefore = require('date-fns/is_before')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, BCRYPT_SALT_ROUNDS, loadExceptionBalance, getExceptionCredits, getExceptionDebits, getExceptionDebitsWithoutSource } = require('../utils')

async function createUser(obj, args, ctx, info) {
  args.data.password = await bcrypt.hash(args.data.password, BCRYPT_SALT_ROUNDS)
  return ctx.prisma.bindings.mutation.createUser(args, info)
}

async function updateUser(obj, args, ctx, info) {
  if (args.data && args.data.password !== undefined) {
    args.data.password = await bcrypt.hash(args.data.password === null ? '' : args.data.password, BCRYPT_SALT_ROUNDS)
  }
  return ctx.prisma.bindings.mutation.updateUser(args, info)
}

async function authenticate(obj, args, ctx, info) {
  const user = await ctx.prisma.bindings.query.user({ where: { username: args.username } }, `{ id password roles { name } }`)
  if (user) {
    const valid = await bcrypt.compare(args.password, user.password)
    if (valid) {
      return {
        user,
        token: jwt.sign({ user: { id: user.id, roles: user.roles } }, APP_SECRET)
      }
    }
  }
  throw new Error('No se pudo Iniciar Session')
}

async function createException (obj, { data }, { prisma, session }, info) {
  const userId = session.user.id
  const employeeId = data.employee.id
  const exceptionDates = data.slots.map(({ date }) => date)

  const userIsSupervisor = await prisma.client.$exists.employee({ id: employeeId, department: { supervisors_some: { id: userId } } })
  if (!userIsSupervisor) throw new Error(`Usuario no es supervisor authorizado`)

  const exceptionDateCollision = await prisma.client.$exists.exception({ employee: { id: employeeId }, slots_some: { date_in: exceptionDates }, authorization: { granted: true }, cancellation: null })
  if (exceptionDateCollision) throw new Error(`Conflicto de fecha con boletas existentes`)

  const balance = await loadExceptionBalance(prisma, employeeId, data)

  const debitsWithoutSource =  getExceptionDebitsWithoutSource(balance)
  if (debitsWithoutSource.length) throw new Error(`Debitos sin fuente en fechas ${debits.map(({ date }) => format(date, 'DD/MM/YYYY')).join(', ')}`)

  return prisma.bindings.mutation.createException({
    data: {
      type: data.type,
      owner: { connect: { id: userId } },
      employee: {
        connect: {
          id: employeeId
        }
      },
      slots: {
        create: data.slots.map(({ source1, source2, date, schedule }) => ({
          date,
          source1: !source1 ? null : { connect: source1 },
          source2: !source2 ? null : { connect: source2 },
          schedule: {
            connect: !schedule.connect ? null : schedule.connect,
            create: !schedule.create ? null : {
              ...schedule.create,
              offline1: {
                create: schedule.create.offline1
              },
              offline2: {
                create: schedule.create.offline2
              },
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

async function rejectException(obj, { where, data }, { prisma, session }, info) {

  const [ exceptionRejected, exceptionAuthorized, exceptionCancelled ] = await Promise.all([
    prisma.client.$exists.exception({ ...where, rejection: { id_not: null } }),
    prisma.client.$exists.exception({ ...where, authorization: { id_not: null } }),
    prisma.client.$exists.exception({ ...where, cancellation: { id_not: null } })
  ])

  if (exceptionRejected) throw new Error(`Boleta ya rechazada`)
  if (exceptionAuthorized) throw new Error(`Boleta ya authorizada`)
  if (exceptionCancelled) throw new Error(`Boleta ya cancellada`)

  return prisma.bindings.mutation.updateException({ where, data: {
    rejection: {
      create: {
        ...data,
        owner: { connect: { id: session.user.id } }
      }
    }
  } }, info)
}

async function authorizeException(obj, { where, data }, { prisma, session }, info) {

  const [ exceptionRejected, exceptionAuthorized, exceptionCancelled ] = await Promise.all([
    prisma.client.$exists.exception({ ...where, rejection: { id_not: null } }),
    prisma.client.$exists.exception({ ...where, authorization: { id_not: null } }),
    prisma.client.$exists.exception({ ...where, cancellation: { id_not: null } })
  ])

  if (exceptionRejected) throw new Error(`No se permite authorizar boleta rechazada`)
  if (exceptionAuthorized) throw new Error(`No se permite authorizar boleta authorizada`)
  if (exceptionCancelled) throw new Error(`No se permite authorizar boleta cancelada`)

  const exception = await prisma.bindings.query.exception({ where }, `
    {
      id
      type
      employee {
        id
      }
      slots {
        schedule {
          offline1 {
            category
          }
          offline2 {
            category
          }
        }
        date
        source1 {
          id
        }
        source2 {
          id
        }
      }
    }
  `)
  const employeeId = exception.employee.id
  const exceptionDates = exception.slots.map(({ date }) => date)

  const exceptionDateCollision = await prisma.client.$exists.exception({ employee: { id: employeeId }, slots_some: { date_in: exceptionDates }, authorization: { id_not: null }, cancellation: null })
  if (exceptionDateCollision) throw new Error(`Conflicto de fecha con boletas existentes`)

  const balance = await loadExceptionBalance(prisma, employeeId, exception)

  const debitsWithoutSource =  getExceptionDebitsWithoutSource(balance)
  if (debitsWithoutSource.length) throw new Error(`Debitos sin fuente en fechas ${debits.map(({ date }) => format(date, 'DD/MM/YYYY')).join(', ')}`)

  const debits = getExceptionDebits(balance, exception)
  const credits = getExceptionCredits(balance, exception)

  return prisma.bindings.mutation.updateException({ where, data: {
    credits: {
      create: credits
    },
    debits: {
      create: debits
    },
    authorization: {
      create: {
        ...data,
        owner: { connect: { id: session.user.id } }
      }
    }
  } }, info)
}


async function cancelException(obj, { where, data }, { prisma, session }, info) {

  const [ exceptionRejected, exceptionAuthorized, exceptionCancelled ] = await Promise.all([
    prisma.client.$exists.exception({ ...where, rejection: { id_not: null } }),
    prisma.client.$exists.exception({ ...where, authorization: { id_not: null } }),
    prisma.client.$exists.exception({ ...where, cancellation: { id_not: null } })
  ])

  if (exceptionRejected) throw new Error(`No se permite cancelar boleta rechazada`)
  if (!exceptionAuthorized) throw new Error(`No se permite cancelar boleta no autorizada`)
  if (exceptionCancelled) throw new Error(`No se permite cancelar boleta cancelada`)

  const [ relatedCredits, relatedDebits ] = await Promise.all([
    prisma.bindings.query.scheduleCredits({ where: { sourceException: where } }, `{ id }`),
    prisma.bindings.query.scheduleDebits({ where: { exception: where } }, `{ id }`)
  ])

  return prisma.bindings.mutation.updateException({ where, data: {
    credits: {
      delete: relatedCredits
    },
    debits: {
      delete: relatedDebits
    },
    cancellation: {
      create: {
        ...data,
        owner: { connect: { id: session.user.id } }
      }
    }
  } }, info)
}

async function deleteException(obj, { where }, { prisma, session }, info) {

  const [ exceptionAuthorized, exceptionCancelled ] = await Promise.all([
    prisma.client.$exists.exception({ ...where, authorization: { id_not: null } }),
    prisma.client.$exists.exception({ ...where, cancellation: { id_not: null } })
  ])

  if (exceptionAuthorized) throw new Error(`No se permite eliminar boleta authorizada`)
  if (exceptionCancelled) throw new Error(`No se permite eliminar boleta cancellada`)

  const exception = await prisma.bindings.query.deleteException({ where }, info)
  await prisma.client.deleteException(where)
  return exception
}

async function createShift(obj, { data }, ctx, info) {
  const userId = ctx.session.user.id
  const employeeId = data.employee.id

  if (data.endDate && isBefore(data.endDate, data.startDate)) throw new Error('Fecha final debe ser nula o posterior a fecha inicial')

  return ctx.prisma.bindings.mutation.createShift({
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

  const oldShift = await ctx.prisma.bindings.query.shift({ where }, `
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

  return ctx.prisma.bindings.mutation.updateShift({ where, data: newShift }, info)
}

module.exports = {
  createUser,
  updateUser,
  authenticate,
  createException,
  rejectException,
  authorizeException,
  cancelException,
  deleteException,
  createShift,
  updateShift,
  deleteShift: async (parent, args, ctx, info) => {
    // workaround: cannot return relations on delete mutation
    const response = await ctx.prisma.bindings.query.shift(args, info)
    await ctx.prisma.bindings.mutation.deleteShift(args, `{ id }`)
    return response
  },
  createEmployee: (parent, args, ctx, info) => ctx.prisma.bindings.mutation.createEmployee(args, info),
  updateEmployee: (parent, args, ctx, info) => ctx.prisma.bindings.mutation.updateEmployee(args, info),
  createSchedule: (parent, args, ctx, info) => ctx.prisma.bindings.mutation.createSchedule(args, info),
  createDepartment: (parent, args, ctx, info) => ctx.prisma.bindings.mutation.createDepartment(args, info),
  updateDepartment: (parent, args, ctx, info) => ctx.prisma.bindings.mutation.updateDepartment(args, info),
  deleteDepartment: (parent, args, ctx, info) => ctx.prisma.bindings.mutation.deleteDepartment(args, info)
}
