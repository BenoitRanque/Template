module.exports = {
  shifts: {
    resolve: async ({ shifts }, args, { db }, info) => {
      return shifts && shifts.length ? db.query.shifts({ where: { id_in: shifts.map(({ id }) => id) } }, info) : []
    }
  },
  holidays: {
    resolve: async ({ holidays }, args, { db }, info) => {
      return holidays && holidays.length ? db.query.holidays({ where: { id_in: holidays.map(({ id }) => id) } }, info) : []
    }
  },
  exceptions: {
    resolve: async ({ exceptions }, args, { db }, info) => {
      return exceptions && exceptions.length ? db.query.exceptions({ where: { id_in: exceptions.map(({ id }) => id) } }, info) : []
    }
  },
  eventCount: {
    resolve: async (obj, args, ctx, info) => obj.events.length
  }
}