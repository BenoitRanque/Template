// async function feed(parent, args, context, info) {
//   const where = args.filter
//     ? {
//         OR:  [
//           { url_contains:  args.filter },
//           { description_contains:  args.filter },
//         ],
//       }
//     : {}

//   const queriedLinkes = await context.db.query.links(
//     { where, skip:  args.skip, first:  args.first, orderBy:  args.orderBy },
//     `{ id }`,
//   )

//   const countSelectionSet = `
//     {
//       aggregate {
//         count
//       }
//     }
//   `
//   const linksConnection = await context.db.query.linksConnection({}, countSelectionSet)

//   return {
//     count:  linksConnection.aggregate.count,
//     linkIds:  queriedLinkes.map(link => link.id),
//   }
// }
const { getUserId } = require('../utils')
const loadAttendanceReport = require('../loadAttendanceReport')

module.exports = {
  // feed,
  sessionUser:  (obj, args, ctx, info) => {
    // will throw if no session jwt exists
    const userId = getUserId(ctx)
    return ctx.db.query.user({ where:  { id:  userId }}, info)
  },
  user: (obj, args, ctx, info) => ctx.db.query.user(args, info),
  users: (obj, args, ctx, info) => ctx.db.query.users(args, info),
  employee: (obj, args, ctx, info) => ctx.db.query.employee(args, info),
  employees: (obj, args, ctx, info) => ctx.db.query.employees(args, info),
  schedule: (obj, args, ctx, info) => ctx.db.query.schedule(args, info),
  schedules: (obj, args, ctx, info) => ctx.db.query.schedules(args, info),
  shift: (obj, args, ctx, info) => ctx.db.query.shift(args, info),
  shifts: (obj, args, ctx, info) => ctx.db.query.shifts(args, info),
  exception: (obj, args, ctx, info) => ctx.db.query.exception(args, info),
  exceptions: (obj, args, ctx, info) => ctx.db.query.exceptions(args, info),
  attendanceReport: async (obj, args, ctx, info) => {
    return loadAttendanceReport({
      from: args.from,
      to: args.to,
      employee: await ctx.db.query.employee({ ...args.employee }, `{ id zkTimePin }`)
    }, ctx)
  },
  attendanceReports: async (obj, args, ctx, info) => {
    const employees = await ctx.db.query.employees({ ...args.employees }, `{ id zkTimePin }`)
    return employees.map(employee => loadAttendanceReport({
      from: args.from,
      to: args.to,
      employee
    }, ctx))
  }
}
