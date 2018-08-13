// async function feed(parent, args, context, info) {
//   const where = args.filter
//     ? {
//         OR: [
//           { url_contains: args.filter },
//           { description_contains: args.filter },
//         ],
//       }
//     : {}

//   const queriedLinkes = await context.db.query.links(
//     { where, skip: args.skip, first: args.first, orderBy: args.orderBy },
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
//     count: linksConnection.aggregate.count,
//     linkIds: queriedLinkes.map(link => link.id),
//   }
// }

module.exports = {
  // feed,
  user: (parent, args, ctx, info) => ctx.db.query.user(args, info),
  users: (parent, args, ctx, info) => ctx.db.query.users(args, info),
  employee: (parent, args, ctx, info) => ctx.db.query.employee(args, info),
  employees: (parent, args, ctx, info) => ctx.db.query.employees(args, info),
  schedule: (parent, args, ctx, info) => ctx.db.query.schedule(args, info),
  schedules: (parent, args, ctx, info) => ctx.db.query.schedules(args, info),
  shift: (parent, args, ctx, info) => ctx.db.query.shift(args, info),
  shifts: (parent, args, ctx, info) => ctx.db.query.shifts(args, info),
  exception: (parent, args, ctx, info) => ctx.db.query.exception(args, info),
  exceptions: (parent, args, ctx, info) => ctx.db.query.exceptions(args, info)
}
