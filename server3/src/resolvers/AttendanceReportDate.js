module.exports = {
  schedule: {
    resolve: async (obj, args, ctx, info) => !obj.schedule || !obj.schedule.id ? null : ctx.db.query.schedule({ where: { id: obj.schedule.id } }, info)
  },
  shift: {
    resolve: async (obj, args, ctx, info) => !obj.shift || !obj.shift.id ? null : ctx.db.query.shift({ where: { id: obj.shift.id } }, info)
  },
  exception: {
    resolve: async (obj, args, ctx, info) => !obj.exception || !obj.exception.id ? null : ctx.db.query.exception({ where: { id: obj.exception.id } }, info)
  },
  eventCount: {
    resolve: async (obj, args, ctx, info) => obj.events.length
  },
  compliance: {
    resolve: async (obj, args, ctx, info) => {

    }
  }
}


function getBoundsForTimelineEvent (event, { schedule, innerBound, outerBound, date }) {
  const candidateReferences = [innerBound, outerBound]
    .concat(schedule.timeline.reduce((acc, { startRequireEvent, startTime, endTime, endRequireEvent }) => {
      if (startRequireEvent) acc.push(Math.round((startTime + event) / 2))
      if (endRequireEvent) acc.push(Math.round((endTime + event) / 2))
      return acc
    }, []))
    .concat(schedule.restline.reduce((acc, { startRequireEvent, startTime, endRequireEvent, endTime }) => {
      if (startRequireEvent) acc.push(startTime)
      if (endRequireEvent) acc.push(endTime)
      return acc
    }, []))

  const innerBound = Math.max(...candidateReferences.filter(reference => reference < event))
  const outerBound = Math.min(...candidateReferences.filter(reference => reference > event))

  return {
    innerBound: addMinutes(date, innerBound).toISOString(),
    outerBound: addMinutes(date, outerBound).toISOString()
  }
}
