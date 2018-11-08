
const format = require('date-fns/format')
const isBefore = require('date-fns/is_before')
const isAfter = require('date-fns/is_after')
const isWithinRange = require('date-fns/is_within_range')
const isSameDay = require('date-fns/is_same_day')
const isSameMinute = require('date-fns/is_same_minute')
const differenceInCalendarDays = require('date-fns/difference_in_calendar_days')
const differenceInMinutes = require('date-fns/difference_in_minutes')
const differenceInSeconds = require('date-fns/difference_in_seconds')
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

const SCH_TIME_EXTRA = 'SCH_TIME_EXTRA'

module.exports = {
  schedule: {
    resolve: async (data, args, ctx, info) => !data.schedule || !data.schedule.id ? null : ctx.db.query.schedule({ where: { id: data.schedule.id } }, info)
  },
  shift: {
    resolve: async (data, args, ctx, info) => !data.shift || !data.shift.id ? null : ctx.db.query.shift({ where: { id: data.shift.id } }, info)
  },
  exception: {
    resolve: async (data, args, ctx, info) => !data.exception || !data.exception.id ? null : ctx.db.query.exception({ where: { id: data.exception.id } }, info)
  },
  holiday: {
    resolve: async (data, args, ctx, info) => !data.holiday || !data.holiday.id ? null : ctx.db.query.holiday({ where: { id: data.holiday.id } }, info)
  },
  eventCount: {
    resolve: async (data, args, ctx, info) => data.events.length
  },
  compliance: {
    resolve: async (data, args, ctx, info) => {
      if (!data.schedule || isAfter(data.innerBound, new Date())) return null

      const timelineGroups = getTimelineGroupsWithEvents(data)
      const restlineGroups = getRestlineGroupsWithEvents(data)

      return {
        lateStart: getLateStart(timelineGroups),
        earlyEnd: getEarlyEnd(timelineGroups),
        restOvertime: getRestOvertime(restlineGroups),
        missingStartEventCount: getMissingStartEventCount(timelineGroups),
        missingEndEventCount: getMissingEndEventCount(timelineGroups),
        missingRestEventCount: getMissingRestEventCount(restlineGroups),
        absentTime: getAbsentTime(timelineGroups)
      }
    }
  }
}

function isBeforeNow(time, date) {
  return isBefore(addMinutes(date, time), new Date())
}

function getLateStart (timelineGroups) {
  return timelineGroups.reduce((result, group) => {
    const startEventTime = addMinutes(group.date, group.startEventTime)

    if (group.startEvent && group.startEventCategory !== SCH_TIME_EXTRA) {
      const difference = differenceInMinutes(group.startEvent, startEventTime)
      if (difference > 0) {
        result.time += difference,
        result.count += 1
      }
    }

    return result
  }, {
    time: 0,
    count: 0
  })
}

function getEarlyEnd (timelineGroups) {
  return timelineGroups.reduce((result, group) => {
    const endEventTime = addMinutes(group.date, group.endEventTime)
    // round early time down to nearest minute
    // expect 00:05:00, get 00:04:05, returns 00:01:00 late time
    if (group.endEvent && group.endEventCategory !== SCH_TIME_EXTRA) {
      const difference = differenceInMinutes(endEventTime, group.endEvent)
      if (difference > 0) {
        result.time += difference,
        result.count += 1
      }
    }

    return result
  }, {
    time: 0,
    count: 0
  })
}

function getRestOvertime (restlineGroups) {
  return restlineGroups.reduce((result, group) => {
    if (group.startEvent && group.endEvent) {
      const difference = differenceInMinutes(group.endEvent, group.startEvent) - group.duration

      if (difference > 0) {
        result.time += difference
        result.count += 1
      }
    }

    return result
  }, {
    time: 0,
    count: 0
  })
}

function getMissingStartEventCount (timelineGroups) {
  return timelineGroups.reduce((result, group) => {
    if (isBeforeNow(group.startEventTime, group.date) && group.startEventRequired && !group.startEvent && (!group.endEventRequired || group.endEvent)) {
      result += 1
    }
    return result
  }, 0)
}

function getMissingEndEventCount (timelineGroups) {
  return timelineGroups.reduce((result, group) => {
    if (isBeforeNow(group.endEventTime, group.date) && group.endEventRequired && !group.endEvent && (!group.startEventRequired || group.startEvent)) {
      result += 1
    }
    return result
  }, 0)
}

function getMissingRestEventCount (restlineGroups) {
  return restlineGroups.reduce((result, group) => {
    if (isBeforeNow(group.endTime, group.date)) {
      if (group.startEventRequired && !group.startEvent) {
        result += 1
      }
      if (group.endEventRequired && !group.endEvent) {
        result += 1
      }
    }
    return result
  }, 0)
}

function getAbsentTime (timelineGroups) {
  return timelineGroups.reduce((result, group) => {
    if (isBeforeNow(group.startTime, group.date) && (group.startEventRequired || group.endEventRequired) && !group.startEvent && !group.endEvent) {
      result += group.endTime - group.startTime
    }
    return result
  }, 0)
}

function getRestlineGroupsWithEvents ({ schedule, date, events }) {
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

function getTimelineGroupsWithEvents(data) {
  const groups = getTimelineGroups(data)

  return groups.map(group => ({
    ...group,
    startEvent: group.startEventRequired ? getTimelineStartEvent(group.startTime, data) : null,
    endEvent: group.endEventRequired ? getTimelineEndEvent(group.endTime, data) : null
  }))
}

function getTimelineGroups({ schedule, date }) {

  function getGroupToAppendTimelineElement(element, groups) {
    // element must be contigent and there cannot be two starting/ending elements in the same group
    if (groups.length) {
      let group = groups.find(b => b.endTime === element.startTime)
      if (group) {
        if (!element.startEventRequired || !group.startEventRequired) {
          if (!element.endEventRequired || !group.endEventRequired) {
            return group
          }
        }
      }
    }
    return null
  }

  const groups = []

  schedule.timeline.forEach(element => {
    const group = getGroupToAppendTimelineElement(element, groups)

    if (group) {
      group.members.push(element)

      if (!group.startEventRequired  && element.startEventRequired) {
        // overwrite start event
        group.startEventRequired = element.startEventRequired
        group.startEventTime = element.startTime
        group.startEventCategory = element.category
      }
      if (!group.endEventRequired  && element.endEventRequired) {
        // overwrite end event
        group.endEventRequired = element.endEventRequired
        group.endEventTime = element.endTime
        group.endEventCategory = element.category
      }
      // overwrite end data
      group.endTime = element.endTime
      group.endCategory = element.category

    } else {
      // add new group
      groups.push({
        date,
        members: [element],
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

  return groups
}

function getTimelineStartEvent (time, data) {
  const { innerBound, outerBound } = getBoundsForTimelineEvent(time, data)

  const candidateEvents = data.events.filter(event => isWithinRange(event, innerBound, outerBound))

  if (candidateEvents.length) {
    return min(candidateEvents)
  }
  return null
}

function getTimelineEndEvent (time, data) {
  const { innerBound, outerBound } = getBoundsForTimelineEvent(time, data)

  const candidateEvents = data.events.filter(event => isWithinRange(event, innerBound, outerBound))

  if (candidateEvents.length) {
    return max(candidateEvents)
  }
  return null
}

function getBoundsForTimelineEvent (event, { schedule, innerBound, outerBound, date }) {
  const candidateReferences = [differenceInMinutes(innerBound, date), differenceInMinutes(outerBound, date)]
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
