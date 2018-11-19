const { getUserId } = require('../utils')

module.exports = {
  // node (parent, { id }, ctx, info) {
  //   return ctx.prisma.bindings.query.node({ id }, info)
  // },
  sessionUser:  (obj, args, ctx, info) => {
    // will throw if no session jwt exists
    const userId = getUserId(ctx)
    return ctx.prisma.bindings.query.user({ where: { id: userId }}, info)
  },
  user: (obj, args, ctx, info) => ctx.prisma.bindings.query.user(args, info),
  users: (obj, args, ctx, info) => ctx.prisma.bindings.query.users(args, info),
  employee: (obj, args, ctx, info) => ctx.prisma.bindings.query.employee(args, info),
  employees: (obj, args, ctx, info) => ctx.prisma.bindings.query.employees(args, info),
  employeesConnection: (obj, args, ctx, info) => ctx.prisma.bindings.query.employeesConnection(args, info),
  schedule: (obj, args, ctx, info) => ctx.prisma.bindings.query.schedule(args, info),
  schedules: (obj, args, ctx, info) => ctx.prisma.bindings.query.schedules(args, info),
  schedulesConnection: (obj, args, ctx, info) => ctx.prisma.bindings.query.schedulesConnection(args, info),
  scheduleCredit: (obj, args, ctx, info) => ctx.prisma.bindings.query.scheduleCredit(args, info),
  scheduleCredits: (obj, args, ctx, info) => ctx.prisma.bindings.query.scheduleCredits(args, info),
  scheduleCreditsConnection: (obj, args, ctx, info) => ctx.prisma.bindings.query.scheduleCreditsConnection(args, info),
  shift: (obj, args, ctx, info) => ctx.prisma.bindings.query.shift(args, info),
  shifts: (obj, args, ctx, info) => ctx.prisma.bindings.query.shifts(args, info),
  shiftsConnection: (obj, args, ctx, info) => ctx.prisma.bindings.query.shiftsConnection(args, info),
  exception: (obj, args, ctx, info) => ctx.prisma.bindings.query.exception(args, info),
  exceptions: (obj, args, ctx, info) => ctx.prisma.bindings.query.exceptions(args, info),
  exceptionsConnection: (obj, args, ctx, info) => ctx.prisma.bindings.query.exceptionsConnection(args, info),
  department: (obj, args, ctx, info) => ctx.prisma.bindings.query.department(args, info),
  departments: (obj, args, ctx, info) => ctx.prisma.bindings.query.departments(args, info),
  fieldOptionLabels: (obj, args, ctx, info) => ctx.prisma.bindings.query.fieldOptionLabels(args, info)
}
