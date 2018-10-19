module.exports = {
  employee: {
    resolve: async (obj, args, ctx, info) => !obj.employee || !obj.employee.id ? null : ctx.db.query.employee({ where: { id: obj.employee.id } }, info)
  },
}