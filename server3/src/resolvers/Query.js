const { getUserId } = require('../utils')

module.exports = {
  // node (parent, { id }, ctx, info) {
  //   return ctx.db.query.node({ id }, info)
  // },
  sessionUser:  (obj, args, ctx, info) => {
    // will throw if no session jwt exists
    const userId = getUserId(ctx)
    return ctx.db.query.user({ where: { id: userId }}, info)
  },
  user: (obj, args, ctx, info) => ctx.db.query.user(args, info),
  users: (obj, args, ctx, info) => ctx.db.query.users(args, info),
  employee: (obj, args, ctx, info) => ctx.db.query.employee(args, info),
  employees: (obj, args, ctx, info) => ctx.db.query.employees(args, info),
  employeesConnection: (obj, args, ctx, info) => ctx.db.query.employeesConnection(args, info),
  schedule: (obj, args, ctx, info) => ctx.db.query.schedule(args, info),
  schedules: (obj, args, ctx, info) => ctx.db.query.schedules(args, info),
  schedulesConnection: (obj, args, ctx, info) => ctx.db.query.schedulesConnection(args, info),
  shift: (obj, args, ctx, info) => ctx.db.query.shift(args, info),
  shifts: (obj, args, ctx, info) => ctx.db.query.shifts(args, info),
  exception: (obj, args, ctx, info) => ctx.db.query.exception(args, info),
  exceptions: (obj, args, ctx, info) => ctx.db.query.exceptions(args, info),
  department: (obj, args, ctx, info) => ctx.db.query.department(args, info),
  departments: (obj, args, ctx, info) => ctx.db.query.departments(args, info)
}
