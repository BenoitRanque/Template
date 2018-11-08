module.exports = {
  shifts: {
    resolve: async ({ shifts }, args, { prisma }, info) => {
      return shifts && shifts.length ? prisma.bindings.query.shifts({ where: { id_in: shifts.map(({ id }) => id) } }, info) : []
    }
  },
  holidays: {
    resolve: async ({ holidays }, args, { prisma }, info) => {
      return holidays && holidays.length ? prisma.bindings.query.holidays({ where: { id_in: holidays.map(({ id }) => id) } }, info) : []
    }
  },
  exceptions: {
    resolve: async ({ exceptions }, args, { prisma }, info) => {
      return exceptions && exceptions.length ? prisma.bindings.query.exceptions({ where: { id_in: exceptions.map(({ id }) => id) } }, info) : []
    }
  },
  eventCount: {
    resolve: async (obj, args, ctx, info) => obj.events.length
  }
}