const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, BCRYPT_SALT_ROUNDS, getUserId } = require('../utils')

// function post(parent, args, context, info) {
//   const userId = getUserId(context)
//   return context.db.mutation.createLink(
//     {
//       data: {
//         url: args.url,
//         description: args.description,
//         postedBy: { connect: { id: userId } },
//       },
//     },
//     info,
//   )
// }

async function createUser(parent, args, ctx, info) {
  const password = await bcrypt.hash(args.data.password, BCRYPT_SALT_ROUNDS)
  const user = await ctx.db.mutation.createUser({
    data: { ...args.data, password },
  }, `{ id }`)

  // const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return ctx.db.query.user({ where: { id: user.id }}, info)
}

async function authenticate(parent, args, ctx, info) {
  const user = await ctx.db.query.user({ where: { username: args.username } }, `{ id password }`)
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  return {
    token: jwt.sign({ userId: user.id }, APP_SECRET),
    user,
  }
}

async function createException(parent, { data }, ctx, info) {

  const userId = getUserId(ctx)
  const employeeId = data.employee.id
  const exceptionDates = data.slots.map(({ date }) => date)

  console.log('UserId', userId)
  console.log('EmployeeId', data)

  const userIsSupervisor = await ctx.db.query.employees({
    where: {
      id: employeeId,
      department: {
        supervisors_some: {
          id: userId
        }
      }
    }
  }, `{ id }`)
  console.log('Hello', userIsSupervisor)
  if (!userIsSupervisor.length) throw new Error('User is not an authorized supervisor of employee')

  const exceptionsWithDuplicateDates = await ctx.db.query.exceptions({
    where: {
      employee: {
        id: employeeId
      },
      slots_some: {
        date_in: exceptionDates
      }
    }
  }, `{ id }`)
  if (exceptionsWithDuplicateDates.length > 0) throw new Error('Conflict with other exceptions: dates already exist')

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
            create: {
              ...schedule,
              restline: {
                create: schedule.restline
              },
              timeline: {
                create: schedule.timeline
              }
            }
          }
        }))
      }
    }
  }, info)
}


module.exports = {
  // post,
  createUser,
  authenticate,
  createException,
  createEmployee: (parent, args, ctx, info) => ctx.db.mutation.createEmployee(args, info),
  updateEmployee: (parent, args, ctx, info) => ctx.db.mutation.updateEmployee(args, info),
  createSchedule: (parent, args, ctx, info) => ctx.db.mutation.createSchedule(args, info),
  createShift: (parent, args, ctx, info) => ctx.db.mutation.createShift(args, info),
  createDepartment: (parent, args, ctx, info) => ctx.db.mutation.createDepartment(args, info),
  updateDepartment: (parent, args, ctx, info) => ctx.db.mutation.updateDepartment(args, info),
  deleteDepartment: (parent, args, ctx, info) => ctx.db.mutation.deleteDepartment(args, info)
}

// vote
// async function vote(parent, args, context, info) {
//   const userId = getUserId(context)
//   const linkExists = await context.db.exists.Vote({
//     user: { id: userId },
//     link: { id: args.linkId },
//   })
//   if (linkExists) {
//     throw new Error(`Already voted for link: ${args.linkId}`)
//   }

//   return context.db.mutation.createVote(
//     {
//       data: {
//         user: { connect: { id: userId } },
//         link: { connect: { id: args.linkId } },
//       },
//     },
//     info,
//   )
// }
