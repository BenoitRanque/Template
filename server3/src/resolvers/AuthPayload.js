function user(obj, args, ctx, info) {
  return ctx.db.query.user({ where: { id: obj.user.id } }, info)
}

module.exports = { user }
