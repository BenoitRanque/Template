module.exports = {
  shifts: {
    resolve: async ({ shifts }, args, { db }, info) => {
      return Promise.all(shifts.map(shift => db.query.shift({ where: { id: shift.id } }, info)))
    }
  },
  exceptions: {
    resolve: async ({ exceptions }, args, ctx, info) => {
      return Promise.all(exceptions.map(shift => db.query.exception({ where: { id: shift.id } }, info)))
    }
  },
  eventCount: {
    resolve: async (obj, args, ctx, info) => obj.events.length
  }
}