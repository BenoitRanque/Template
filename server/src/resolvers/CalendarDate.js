module.exports = {
  schedule: {
    resolve: async (obj, args, ctx, info) => !obj.schedule || !obj.schedule.id ? null : ctx.db.query.schedule({ where: { id: obj.schedule.id } }, info)
  },
  shift: {
    resolve: async (obj, args, ctx, info) => !obj.shift || !obj.shift.id ? null : ctx.db.query.shift({ where: { id: obj.shift.id } }, info)
  },
  exception: {
    resolve: async (obj, args, ctx, info) => !obj.exception || !obj.exception.id ? null : ctx.db.query.exception({ where: { id: obj.exception.id } }, info)
  }
}