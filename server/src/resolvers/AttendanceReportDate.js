
module.exports = {
  schedule: {
    resolve: async (data, args, ctx, info) => !data.schedule || !data.schedule.id ? null : ctx.prisma.bindings.query.schedule({ where: { id: data.schedule.id } }, info)
  },
  shift: {
    resolve: async (data, args, ctx, info) => !data.shift || !data.shift.id ? null : ctx.prisma.bindings.query.shift({ where: { id: data.shift.id } }, info)
  },
  exception: {
    resolve: async (data, args, ctx, info) => !data.exception || !data.exception.id ? null : ctx.prisma.bindings.query.exception({ where: { id: data.exception.id } }, info)
  },
  holiday: {
    resolve: async (data, args, ctx, info) => !data.holiday || !data.holiday.id ? null : ctx.prisma.bindings.query.holiday({ where: { id: data.holiday.id } }, info)
  }
}
