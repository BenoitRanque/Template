
const format = require('date-fns/format')
const isBefore = require('date-fns/is_before')
const isAfter = require('date-fns/is_after')
const isWithinRange = require('date-fns/is_within_range')
const isSameDay = require('date-fns/is_same_day')
const isSameMinute = require('date-fns/is_same_minute')
const differenceInCalendarDays = require('date-fns/difference_in_calendar_days')
const differenceInMinutes = require('date-fns/difference_in_minutes')
const compareAsc = require('date-fns/compare_asc')
const compareDesc = require('date-fns/compare_desc')
const max = require('date-fns/max')
const min = require('date-fns/min')
const eachDay = require('date-fns/each_day')
const startOfDay = require('date-fns/start_of_day')
const endOfDay = require('date-fns/end_of_day')
const addDays = require('date-fns/add_days')
const subDays = require('date-fns/sub_days')
const addHours = require('date-fns/add_hours')
const addMinutes = require('date-fns/add_minutes')

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

function getRestlineBlocksWithEvents ({ schedule, events }) {
  return schedule.restline.map(rest => {
    const innerBound = addMinutes(date, rest.startTime).toISOString()
    const outerBound = addMinutes(date, rest.endTime).toISOString()
    const candidateEvents = events.filter(event => isWithinRange(event, innerBound, outerBound))

    return {
      ...rest,
      startEvent: rest.startEventRequired && candidateEvents.length > 1 ? min(candidateEvents) : null,
      endEvent: rest.endEventRequired && candidateEvents.length > 1  && (candidateEvents.length > 2 || !rest.startEventRequired) ? max(candidateEvents) : null
    }
  })
}

function getTimelineBlocksWithEvents(obj) {
  const blocks = getTimelineBlocks(obj)

  return blocks.map(block => ({
    ...block,
    startEvent: block.startEventRequired ? getTimelineStartEvent(block.startTime, obj) : null,
    endEvent: block.endEventRequired ? getTimelineEndEvent(block.endTime, obj) : null
  }))
}

function getTimelineBlocks({ schedule }) {

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

  schedule.timeline.forEach(element => {
    const block = getBlockToAppendTimelineElement(element, blocks)

    if (block) {
      if (!block.startEventRequired  && element.startEventRequired) {
        // overwrite start event
        block.startEventRequired = element.startEventRequired
        block.startEventTime = element.startTime
        block.startEventCategory = element.category
      }
      if (!block.endEventRequired  && element.endEventRequired) {
        // overwrite end event
        block.endEventRequired = element.endEventRequired
        block.endEventTime = element.endTime
        block.endEventCategory = element.category
      }
      // overwrite end data
      block.endTime = element.endTime
      block.endCategory = element.category

    } else {
      // add new block
      blocks.push({
        startTime: element.startTime,
        startCategory: element.category,
        startEventRequired: element.startEventRequired,
        // if not required, keep null
        startEventTime: element.startEventRequired ? element.startTime : null,
        startEventCategory: element.startEventRequired ? element.category : null,
        endTime: element.endTime,
        endCategory: element.category,
        endEventRequired: element.endEventRequired,
        // if not required, keep null
        endEventTime: element.endEventRequired ? element.endTime : null,
        endEventCategory: element.endEventRequired ? element.category : null
      })
    }
  })

  return blocks
}

function getTimelineStartEvent (time, obj) {
  const { innerBound, outerBound } = getBoundsForTimelineEvent(time, obj)

  const candidateEvents = obj.events.filter(event => isWithinRange(event, innerBound, outerBound))

  if (candidateEvents.length) {
    return min(candidateEvents)
  }
  return null
}

function getTimelineEndEvent (time, obj) {
  const { innerBound, outerBound } = getBoundsForTimelineEvent(time, obj)

  const candidateEvents = obj.events.filter(event => isWithinRange(event, innerBound, outerBound))

  if (candidateEvents.length) {
    return max(candidateEvents)
  }
  return null
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

  return {
    innerBound: addMinutes(date, Math.max(...candidateReferences.filter(reference => reference < event))).toISOString(),
    outerBound: addMinutes(date, Math.min(...candidateReferences.filter(reference => reference > event))).toISOString()
  }
}
