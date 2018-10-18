module.exports = {
  summary: {
    resolve: async ({ events }, args, ctx, info) => {
      console.log('summary', events)
      return { eventCount: events.length }
    }
  }
}