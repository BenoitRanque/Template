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
      return {
        attendanceBlocks: [
          {
            references: {
              startTime: Date,
              startCategory: Date,
              startEventRequired: Boolean,
              startEventTime: Date,
              startEventCategory: String,
              startEvent: null,
              endTime: Date,
              endCategory: String,
              endEventRequired: Boolean,
              endEventTime: Date,
              endEventCategory: String,
              endEvent: null
            }
          }
        ]
      }
    }
  }
}


function getBoundsForTimelineEvent (event, { schedule, innerBound, outerBound, date }) {
  const candidateReferences = [innerBound, outerBound]
    .concat(schedule.timeline.reduce((acc, { startEventRequired, startTime, endTime, endEventRequired }) => {
      if (startEventRequired) acc.push(Math.round((startTime + event) / 2))
      if (endEventRequired) acc.push(Math.round((endTime + event) / 2))
      return acc
    }, []))
    .concat(schedule.restline.reduce((acc, { startEventRequired, startTime, endEventRequired, endTime }) => {
      if (startEventRequired) acc.push(startTime)
      if (endEventRequired) acc.push(endTime)
      return acc
    }, []))

  const innerBound = Math.max(...candidateReferences.filter(reference => reference < event))
  const outerBound = Math.min(...candidateReferences.filter(reference => reference > event))

  return {
    innerBound: addMinutes(date, innerBound).toISOString(),
    outerBound: addMinutes(date, outerBound).toISOString()
  }
}

function getTimelineBlocks(schedule) {

  function getBlockToAppendTimelineElement(element, blocks) {
    // element must be contigent and there cannot be two starting/ending elements in the same block
    if (blocks.length) {
      let block = blocks.find(b => b.endTime === element.startTime)
      if (block) {
        if (!element.startEventRequired || !block.startEventRequired) {
          if (!element.endEventRequired || !block.endEventRequired) {
            return block
          }
        }
      }
    }
    return null
  }

  const blocks = []

  for (let i = 0, l = schedule.timeline.length; i < l; i += 1) {

    let timelineElement = schedule.timeline[i]

    let block = getBlockToAppendTimelineElement(timelineElement, blocks)

    if (block) {
      if (!block.startEventRequired  && timelineElement.startEventRequired) {
        // overwrite start event
        block.startEventRequired = timelineElement.startEventRequired
        block.startEventTime = timelineElement.startTime
        block.startEventCategory = timelineElement.category
      }
      if (!block.endEventRequired  && timelineElement.endEventRequired) {
        // overwrite end event
        block.endEventRequired = timelineElement.endEventRequired
        block.endEventTime = timelineElement.endTime
        block.endEventCategory = timelineElement.category
      }
      // overwrite end data
      block.endTime = timelineElement.endTime
      block.endCategory = timelineElement.category

    } else {
      // add new block
      blocks.push({
        startTime: timelineElement.startTime,
        startCategory: timelineElement.category,
        startEventRequired: timelineElement.startEventRequired,
        // if not required, keep null
        startEventTime: timelineElement.startEventRequired ? timelineElement.startTime : null,
        startEventCategory: timelineElement.startEventRequired ? timelineElement.category : null,
        endTime: timelineElement.endTime,
        endCategory: timelineElement.category,
        endEventRequired: timelineElement.endEventRequired,
        // if not required, keep null
        endEventTime: timelineElement.endEventRequired ? timelineElement.endTime : null,
        endEventCategory: timelineElement.endEventRequired ? timelineElement.category : null
      })
    }
  }

  return blocks
}
