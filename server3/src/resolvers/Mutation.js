const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

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

async function createUser(parent, args, context, info) {
  const password = await bcrypt.hash(args.data.password, 10)
  const user = await context.db.mutation.createUser({
    data: { ...args.data, password },
  }, `{ id }`)

  // const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return user
}

async function authenticate(parent, args, context, info) {
  const user = await context.db.query.user({ where: { username: args.username } }, `{ id password }`)
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

async function createEmployee (parent, args, context, info) {
  return context.db.mutation.createEmployee(args, info)
}
async function createSchedulePreset (parent, args, context, info) {
  return context.db.mutation.createSchedulePreset(args, info)
}
async function createException (parent, args, context, info) {
  return context.db.mutation.createException(args, info)
}
async function createShift (parent, args, context, info) {
  return context.db.mutation.createShift(args, info)
}

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

module.exports = {
  // post,
  createUser,
  authenticate,
  createEmployee: (parent, args, ctx, info) => ctx.db.mutation.createEmployee(args, info),
  updateEmployee: (parent, args, ctx, info) => ctx.db.mutation.updateEmployee(args, info),
  createSchedule: (parent, args, ctx, info) => ctx.db.mutation.createSchedule(args, info),
  createShift: (parent, args, ctx, info) => ctx.db.mutation.createShift(args, info),
  createException: (parent, args, ctx, info) => ctx.db.mutation.createException(args, info)
  // vote
}
