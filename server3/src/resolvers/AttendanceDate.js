module.exports = {
  schedule: {
    resolve: async (obj, args, ctx, info) => ctx.db.query.schedule({ where: { id: obj.schedule.id } }, info)
  }
}