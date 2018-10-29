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

function getBoundsForRestlineEvent () {

}

// getBoundsForEvent(event) {
//   if (!this.initialized) throw new Error(`Please initialize before calling this function`)

//   let candidateReferences = [startOfDay(event), endOfDay(event)]

//   let eventRef = this.getReferenceForDate(event)

//   if (eventRef && eventRef.schedule) {
//     if (eventRef.schedule.uptime) {
//       eventRef.schedule.uptime.forEach(uptime => {
//         if (uptime.start_require_event && uptime.start_time !== null && !isSameMinute(event, uptime.start_time)) {
//           candidateReferences.push(getHalfpointBetweenDates(event, uptime.start_time))
//         }
//         if (uptime.end_require_event && uptime.end_time !== null && !isSameMinute(event, uptime.end_time)) {
//           candidateReferences.push(getHalfpointBetweenDates(event, uptime.end_time))
//         }
//       })
//     }
//     if (eventRef.schedule.breaktime) {
//       eventRef.schedule.breaktime.forEach(breaktime => {
//         if (breaktime.start_require_event && breaktime.start_time !== null) candidateReferences.push(breaktime.start_time)
//         if (breaktime.end_require_event && breaktime.end_time !== null) candidateReferences.push(breaktime.end_time)
//       })
//     }
//   }

//   return {
//     start: max(...candidateReferences.filter(ref => isBefore(ref, event))),
//     end: min(...candidateReferences.filter(ref => isAfter(ref, event)))
//   }
// }

module.exports = {
  startLateTime: {
    resolve: async (obj, args, ctx, info) => {
      obj.timeline.reduce((acc, val) => {
        if (val.startRequireEvent) {
        }
      }, 0)
    }
  },
  startEventsMissing: {
    resolve: async (obj, args, ctx, info) => {

    }
  },
  endEarlyTime: {
    resolve: async (obj, args, ctx, info) => {

    }
  },
  endEventsMissing: {
    resolve: async (obj, args, ctx, info) => {

    }
  },
  absentTime: {
    resolve: async (obj, args, ctx, info) => {

    }
  },
  unsanctionedEvents: {
    resolve: async (obj, args, ctx, info) => {

    }
  }
}