
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
const getMinutes = require('date-fns/get_minutes')

const SCH_TIME_EXTRA = 'SCH_TIME_EXTRA'
const SCH_TIME_WORK = 'SCH_TIME_WORK'

const { ZKTIME_DB_PATH } = require('../utils')

const knex = require('knex')({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: ZKTIME_DB_PATH
  }
})

module.exports = {
  nameFull: {
    fragment: `fragment EmployeeNames on Employee { nameFirst nameMiddle namePaternal nameMaternal }`,
    resolve: ({ nameFirst, nameMiddle, namePaternal, nameMaternal }, args, ctx, info) => [nameFirst, nameMiddle, namePaternal, nameMaternal].join(' ').trim().replace(/  /, ' ')
  },
  attendanceReport: {
    fragment: `fragment EmployeeIDzkTimePin on Employee { id zkTimePin }`, // fragment ensures requires parent object properties will be present
    resolve: async (obj, args, ctx, info) => loadAttendanceReport(obj, args, ctx, info)
  },
  calendarDate: {
    fragment: `fragment EmployeeID on Employee { id }`, // fragment ensures requires parent object properties will be present
    resolve: async (obj, args, ctx, info) => loadCalendarDate(obj, args, ctx, info)
  },
  calendarRange: {
    fragment: `fragment EmployeeID on Employee { id }`, // fragment ensures requires parent object properties will be present
    resolve: async (obj, args, ctx, info) => loadCalendarRange(obj, args, ctx, info)
  },
  vacationRange: {
    fragment: `fragment EmployeeID on Employee { id }`, // fragment ensures requires parent object properties will be present
    resolve: async (obj, args, ctx, info) => {
      const presetSchedules = await loadVacationSchedules(ctx)
      const range = await loadCalendarRange(obj, args, ctx, info, true)
      return range.map(calendarDate => ({
        ...calendarDate,
        schedule: getVacationSchedule(calendarDate, presetSchedules)
      }))
    }
  }
}

async function loadCalendarDate({ id }, { date, withExceptions, withHolidays }, { prisma }) {
  const references = await loadEmployeeReferencesForDateRange(prisma, id, date, date, { withExceptions, withHolidays, withScheduleData: false })
  return {
    date,
    ...getReferencesForDate(date, references)
  }
}

async function loadCalendarRange({ id }, { from, to, withExceptions, withHolidays }, { prisma }, info, withScheduleData = false) {
  const references = await loadEmployeeReferencesForDateRange(prisma, id, from, to, { withExceptions, withHolidays, withScheduleData })

  const dates = eachDay(from, to)

  return dates.map(date => ({
    date,
    ...getReferencesForDate(date, references)
  }))
}

async function loadAttendanceReport({ id, zkTimePin }, { from, to, withExceptions, withHolidays }, { prisma }) {

  // we load the data for one day before in that day's schedule slightly overlaps the first day in this range
  const references = await loadEmployeeReferencesForDateRange(prisma, id, subDays(from, 1), to, { withExceptions, withHolidays, withScheduleData: true })
  const events = await loadEmployeeEventsForDateRange(zkTimePin, from, to)

  const dates = getAttendanceDates(from, to, references, events)

  return {
    from,
    to,
    shifts: references.shifts.filter(shift => !isAfter(shift.startDate, to) && (!shift.endDate || isBefore(shift.endDate, from))),
    exceptions: references.exceptions.filter(exception => exception.slots.some(slot => isWithinRange(slot.date, from, to))),
    events: events.filter(event => isWithinRange(event, dates[0].innerBound, dates[dates.length - 1].outerBound)),
    dates
  }
}

async function loadEmployeeEventsForDateRange(zkTimePin, from, to) {
  const between = [format(from, 'YYYY-MM-DD'), format(addDays(to, 2), 'YYYY-MM-DD')]

  const events = await knex('att_punches')
    .innerJoin('hr_employee', 'hr_employee.id', 'att_punches.emp_id')
    .select(['punch_time']) // posssibly interesting fields: 'punch_time', 'terminal_id', 'emp_pin'
    .where({ 'emp_pin': zkTimePin })
    .whereBetween('punch_time', between)

  return events
    .map(({ punch_time }) => punch_time)
    .sort(compareAsc)
}

async function loadEmployeeReferencesForDateRange(prisma, employeeId, from, to, { withExceptions, withHolidays, withScheduleData } = { withScheduleData: false, withExceptions: false, withHolidays: false }) {
  const data = await prisma.bindings.request(`
    query ($id: ID! $from: DateTime! $to: DateTime! $withHolidays: Boolean! $withExceptions: Boolean! $withScheduleData: Boolean!) {
      shifts (where: {
        employee: {
          id: $id
        }
        startDate_lte: $to
        OR: [
          { endDate: null },
          { endDate_gte: $from }
        ]
      }) {
        id
        startDate
        endDate
        slots (orderBy: index_ASC) {
          index
          schedule {
            id
            ...AllScheduleData @include(if: $withScheduleData)
          }
        }
      }
      exceptions (where: {
        employee: {
          id: $id
        }
        authorization: {
          granted: true
        }
        slots_some: {
          date_lte: $to
          date_gte: $from
        }
      }) @include(if: $withExceptions) {
        id
        slots (orderBy: date_ASC) {
          date
          schedule {
            id
            ...AllScheduleData @include(if: $withScheduleData)
          }
        }
      }
      holidays (where: {
        date_lte: $to
        date_gte: $from
      }) @include(if: $withHolidays) {
        id
        date
        name
      }
      holidaySchedule: schedule (where: {
        systemScheduleIdentifier: SYS_SCH_HOLIDAY_HOLIDAY
      }) @include(if: $withHolidays) {
        id
        ...AllScheduleData @include(if: $withScheduleData)
      }
    }

    fragment AllScheduleData on Schedule {
      baseTime
      timeline (orderBy: startTime_ASC) {
        category
        startTime
        startEventRequired
        endTime
        endEventRequired
      }
      restline (orderBy: startTime_ASC) {
        category
        startTime
        startEventRequired
        endTime
        endEventRequired
        duration
      }
      offline1 {
        category
      }
      offline2 {
        category
      }
    }
  `, { id: employeeId, from, to, withExceptions, withHolidays, withScheduleData })

  const holidaySchedule = data.holidaySchedule ? data.holidaySchedule : null

  return {
    shifts: data.shifts ? data.shifts : [],
    exceptions: data.exceptions ? data.exceptions : [],
    holidays: data.holidays ? data.holidays.map(holiday => ({ ...holiday, schedule: holidaySchedule })) : []
  }
}

async function loadVacationSchedules ({ prisma }) {
  const data = await prisma.bindings.request(`
    query {
      VacationVacation: schedule (where: {
        systemScheduleIdentifier: SYS_SCH_VACATION_VACATION
      }) {
        id
        ...AllScheduleData
      }
      DayoffVacation: schedule (where: {
        systemScheduleIdentifier: SYS_SCH_DAYOFF_VACATION
      }) {
        id
        ...AllScheduleData
      }
      VacationDayoff: schedule (where: {
        systemScheduleIdentifier: SYS_SCH_VACATION_DAYOFF
      }) {
        id
        ...AllScheduleData
      }
      DayoffDayoff: schedule (where: {
        systemScheduleIdentifier: SYS_SCH_DAYOFF_DAYOFF
      }) {
        id
        ...AllScheduleData
      }
    }

    fragment AllScheduleData on Schedule {
      baseTime
      timeline (orderBy: startTime_ASC) {
        category
        startTime
        startEventRequired
        endTime
        endEventRequired
      }
      restline (orderBy: startTime_ASC) {
        category
        startTime
        startEventRequired
        endTime
        endEventRequired
        duration
      }
      offline1 {
        category
      }
      offline2 {
        category
      }
    }
  `)

  return {
    VacationVacation: data.VacationVacation ? data.VacationVacation : null,
    DayoffVacation: data.DayoffVacation ? data.DayoffVacation : null,
    VacationDayoff: data.VacationDayoff ? data.VacationDayoff : null,
    DayoffDayoff: data.DayoffDayoff ? data.DayoffDayoff : null
  }
}

function getVacationSchedule(date, { VacationVacation, DayoffVacation, VacationDayoff, DayoffDayoff }) {
  const { schedule } = date

  if (!schedule) return VacationVacation

  if (schedule.offline1 && schedule.offline1.category === 'SCH_DAY_OFF') {
    if (schedule.offline2 && schedule.offline2.category === 'SCH_DAY_OFF') {
      return DayoffDayoff
    } else {
      return DayoffVacation
    }
  } else if (schedule.offline2 && schedule.offline2.category === 'SCH_DAY_OFF') {
    return VacationDayoff
  } else {
    return VacationVacation
  }
}

function getAttendanceDates (from, to, references, events) {
  const dates = eachDay(from, to)

  const datesWithReferences = dates.map(date => ({
    date,
    ...getReferencesForDate(date, references)
  }))

  const referencesForDateBeforeRange = getReferencesForDate(subDays(from, 1), references)

  const datesWithReferencesBounds = getDatesWithBounds(datesWithReferences, referencesForDateBeforeRange)

  const datesWithReferencesBoundsEvents = getDatesWithEvents(datesWithReferencesBounds, events)

  const datesWithReferencesBoundsEventsCompliance = getDatesWithCompliance(datesWithReferencesBoundsEvents)

  return datesWithReferencesBoundsEventsCompliance
}

function getDatesWithEvents(dates, events) {
  return dates.map(date => ({
    ...date,
    events: events.filter(event => isWithinRange(event, date.innerBound, date.outerBound))
  }))
}

function getReferencesForDate(date, { shifts, exceptions, holidays }) {
  const candidateExceptionsForDate = exceptions
    .filter(exception => exception && exception.slots && exception.slots.some(slot => isSameDay(slot.date, date)))
    .sort((a, b) => compareDesc(a.authorization.created_at, b.authorization.created_at))

  const exceptionForDate = candidateExceptionsForDate[0] ? candidateExceptionsForDate[0] : null

  const exceptionScheduleForDate = exceptionForDate ? exceptionForDate.slots.find(slot => isSameDay(slot.date, date)).schedule : null

  const holidayForDate = holidays && holidays.length ? holidays.find(holiday => isSameDay(holiday.date, date)) : null

  const holidayScheduleForDate = holidayForDate && holidayForDate.schedule ? holidayForDate.schedule : null

  const candidateShiftsForDate = shifts
    .filter(shift => shift.endDate ? isWithinRange(date, shift.startDate, shift.endDate) : !isBefore(date, shift.startDate))
    .sort((a, b) => compareDesc(a.startDate, b.startDate))

  const shiftForDate = candidateShiftsForDate[0] ? candidateShiftsForDate[0] : null

  const shiftScheduleForDate = (shiftForDate &&  shiftForDate.slots)
    ? shiftForDate.slots[differenceInCalendarDays(date, shiftForDate.startDate) % shiftForDate.slots.length].schedule : null

  const scheduleForDate = exceptionScheduleForDate ? exceptionScheduleForDate : holidayScheduleForDate ? holidayScheduleForDate : shiftScheduleForDate

  return {
    exception: exceptionForDate ? exceptionForDate : null,
    shift: shiftForDate ? shiftForDate : null,
    holiday: holidayForDate? holidayForDate : null,
    schedule: scheduleForDate
  }
}

function getScheduleOuterBound(schedule) {
  const MINTHRESHOLD = 6 * 60

  if (!schedule || !schedule.timeline) return 24 * 60

  return Math.max(...schedule.timeline.reduce((acc, val) => {
    acc.push(val.startTime + MINTHRESHOLD)
    acc.push(val.endTime + MINTHRESHOLD)
    return acc
  }, [24 * 60]))
}

function getDatesWithBounds(dates, referenceForDateBeforeFirstDate) {
  const firstBound = getScheduleOuterBound(referenceForDateBeforeFirstDate.schedule)
  return dates
    .map(date => ({
      ...date,
      outerBound: getScheduleOuterBound(date.schedule)
    })).map((date, index, arr) => ({
      ...date,
      innerBound: (index === 0 ? firstBound : arr[index - 1].outerBound) - (24 * 60)
    }))
    .map(date => ({
      ...date,
      outerBound: addMinutes(date.date, date.outerBound).toISOString(),
      innerBound: addMinutes(date.date, date.innerBound).toISOString()
    }))
}

function getDatesWithCompliance (dates) {
  return dates.map(date => ({
    ...date,
    compliance: getAttendanceComplianceForDate(date)
  }))
}

function getAttendanceComplianceForDate(data) {
  if (!data.schedule || isAfter(data.outerBound, new Date())) return null

  const timelineGroups = getTimelineGroupsWithEvents(data)
  const restlineGroups = getRestlineGroupsWithEvents(data)

  const compliance = {
    eventCount: data.events ? data.events.length : 0,
    requiredEventCount: getRequiredEventCount(timelineGroups, restlineGroups),
    authorizedExtraTime: getAuthorizedExtraTime(timelineGroups),
    unauthorizedExtraTime: getUnauthorizedExtraTime(timelineGroups),
    lateStart: getLateStart(timelineGroups),
    earlyEnd: getEarlyEnd(timelineGroups),
    restOvertime: getRestOvertime(restlineGroups),
    missingStartEventCount: getMissingStartEventCount(timelineGroups),
    missingEndEventCount: getMissingEndEventCount(timelineGroups),
    missingRestEventCount: getMissingRestEventCount(restlineGroups),
    absentTime: getAbsentTime(timelineGroups)
  }

  return compliance
}

function currentTimeIsAfter(time, date) {
  return isBefore(addMinutes(date, time), new Date())
}

function getAuthorizedExtraTime(timelineGroups) {
  return timelineGroups.reduce((time, group) => {
    // if absent
    if (timelineGroupIsAbsent(group)) return time
    // if group has not started yet
    if (!currentTimeIsAfter(group.startEventTime ? group.startEventTime : group.startTime, group.date)) return time

    let innerBound, outerBound
    // TODO: finish this: get bounds for extra time based on multiple factors, use those to calculate actual extra time

    if (group.startEvent) {
      innerBound = differenceInMinutes(group.startEvent, group.date)
    } else if (!group.startEventRequired) {
      innerBound = group.startTime
    } else if (group.endEvent) {
      let endEventTime = differenceInMinutes(group.endEvent, group.date)
      let candidateBounds = group.members
        .map(({ startTime }) => startTime)
        .filter(value => value <= endEventTime)
        .sort((a, b) => b - a)
      if (candidateBounds.length) {
        innerBound = candidateBounds[0]
      } else {
        throw new Error(`THIS SHOULD NOT HAPPEN: Invalid schedule timeline element: endEvent ${group.endEvent} cannot be before startTime ${group.startEventTime}`)
      }
    } else {
      throw new Error(`THIS SHOULD NOT HAPPEN: this group has no start nor end event, yet requires a start event. it should count as absent`)
    }

    if (group.endEvent) {
      outerBound = differenceInMinutes(group.endEvent, group.date)
    } else if (!group.startEventRequired) {
      outerBound = group.endTime
    } else if (group.startEvent) {
      let startEventTime = differenceInMinutes(group.startEvent, group.date)
      let candidateBounds = group.members
        .map(({ endTime }) => endTime)
        .filter(value => value >= startEventTime)
        .sort((a, b) => a - b)
      if (candidateBounds.length) {
        outerBound = candidateBounds[0]
      } else {
        throw new Error(`THIS SHOULD NOT HAPPEN: Invalid schedule timeline element: startEvent ${group.endEvent} cannot be after endTime ${group.startEventTime}`)
      }
    } else {
      throw new Error(`THIS SHOULD NOT HAPPEN: this group has no start nor end event, yet requires an end event. it should count as absent`)
    }

    return time + group.members.reduce((extraTime, member) => {
      if (member.category === SCH_TIME_EXTRA) {
        const startTime = member.startTime === group.startTime ? innerBound : Math.max(innerBound, member.startTime)
        const endTime = member.endTime === group.endTime ? outerBound : Math.min(outerBound, member.endTime)
        const difference = endTime - startTime
        if (difference > 0) {
          extraTime += difference
        }
      }
      return extraTime
    }, 0)
  }, 0)
}

function getUnauthorizedExtraTime(timelineGroups) {
  return timelineGroups.reduce((time, group) => {
    if (group.startEvent && group.startEventCategory !== SCH_TIME_EXTRA) {
      const reference = addMinutes(group.date, group.startEventTime)
      const difference = differenceInMinutes(reference, group.startEvent)
      if (difference > 0) {
        time += difference
      }
    }
    return time
  }, 0) + timelineGroups.reduce((time, group) => {
    if (group.endEvent && group.endEventCategory !== SCH_TIME_EXTRA) {
      const reference = addMinutes(group.date, group.endEventTime)
      const difference = differenceInMinutes(group.endEvent, reference)
      if (difference > 0) {
        time += difference
      }
    }
    return time
  }, 0)
}

function getRequiredEventCount (timelineGroups, restlineGroups) {
  return timelineGroups.reduce((acc, val) => {
    if (val.startEventRequired) acc += 1
    if (val.endEventRequired) acc += 1
    return acc
  }, 0) + restlineGroups.reduce((acc, val) => {
    if (val.startEventRequired) acc += 1
    if (val.endEventRequired) acc += 1
    return acc
  }, 0)
}

function getLateStart (timelineGroups) {
  return timelineGroups.reduce((result, group) => {
    if (group.startEvent) {
      const candidateReferences = group.members
        .filter(({ category }) => category === SCH_TIME_WORK)
        .map(({ startTime }) => startTime)
        .sort((a, b) => a - b)

      if (candidateReferences && candidateReferences.length) {
        const reference = addMinutes(group.date, candidateReferences[0])
        const difference = differenceInMinutes(group.startEvent, reference)
        if (difference > 0) {
          result.time += difference,
          result.count += 1
        }
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
    if (group.endEvent) {
      const candidateReferences = group.members
        .filter(({ category }) => category === SCH_TIME_WORK)
        .map(({ endTime }) => endTime)
        .sort((a, b) => b - a)

      if (candidateReferences && candidateReferences.length) {
        const reference = addMinutes(group.date, candidateReferences[0])
        const difference = differenceInMinutes(reference, group.endEvent)
        if (difference > 0) {
          result.time += difference,
          result.count += 1
        }
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
    if (timelineGroupStartEventMissing(group)) {
      result += 1
    }
    return result
  }, 0)
}

function timelineGroupStartEventMissing(group) {
  return currentTimeIsAfter(group.startEventTime, group.date) && group.startEventRequired && !group.startEvent && group.endEvent
}

function getMissingEndEventCount (timelineGroups) {
  return timelineGroups.reduce((result, group) => {
    if (timelineGroupEndEventMissing(group)) {
      result += 1
    }
    return result
  }, 0)
}

function timelineGroupEndEventMissing(group) {
  return currentTimeIsAfter(group.endEventTime, group.date) && group.endEventRequired && !group.endEvent && group.startEvent
}

function getMissingRestEventCount (restlineGroups) {
  return restlineGroups.reduce((result, group) => {
    if (currentTimeIsAfter(group.endTime, group.date)) {
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
    if (timelineGroupIsAbsent(group)) {
      result += group.endTime - group.startTime
    }
    return result
  }, 0)
}

function timelineGroupIsAbsent (group) {
  // return true if:
  // neither group start not group end events are present
  // either group start or group end events are required
  // either current time is after group start time AND start event is required OR current time is after end time
  return !group.startEvent && !group.endEvent
    && (group.startEventRequired || group.endEventRequired)
    && ((group.startEventRequired && currentTimeIsAfter(group.startEventTime, group.date)) || (group.endEventRequired && currentTimeIsAfter(group.endEventTime, group.date)))
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
