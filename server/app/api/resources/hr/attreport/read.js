const knextlite = require('@db/knexlite')
const { ATT_WORK, ATT_EXTRA, ATT_BREAK, ATT_TIMEOFF, ATT_VACATION, ATT_HOLIDAY, ATT_LEAVE_SICK, ATT_LEAVE_PAID, ATT_LEAVE_UNPAID } = require('@tools/attType')
const { AttShift, AttException, Employee } = require('@models/hr')

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

module.exports = async (input, { from, to, employee_id }, context) => {
  if ([from, to, employee_id].includes(undefined)) return 'Missing params'


  if (Array.isArray(employee_id)) {
    return await Promise.all(employee_id.map(emp_id => getEmployeeAttendance(emp_id, from, to)))
  } else {
    return await getEmployeeAttendance(employee_id, from, to)
  }
}
  
async function getEmployeeAttendance(employee_id, from, to) {
  const employee = await getEmployeeWithValidShiftsExceptions(employee_id, from, to)

  const { shifts, exceptions, zktime_pin } = employee
  const punches = await getEmployeePunches(zktime_pin, from, to)
  const events = punches.map(({ punch_time }) => new Date(punch_time)).sort(compareAsc)

  const references = eachDay(subDays(from, 1), addDays(to, 2)).map(date => getScheduleForDate(date, shifts, exceptions))

  const attendance = eachDay(from, to).map(date => getAttendanceForDate(date, references, events))

  delete employee.shifts
  delete employee.exceptions
  return {
    employee,
    attendance
  }
}

function getAttendanceForDate(date, references, events) {

  let { schedule, exception, shift } = references.find(ref => isSameDay(ref.date, date))
  let rangeForDate = getRangeForDate(date, references)
  let eventsForDate = events.filter(e => isWithinRange(e, rangeForDate.start, rangeForDate.end))
  let timetable = schedule.timetable.map(t => getAttendanceTimetable(t, references, eventsForDate))
  let balance = getAttendanceBalance(timetable, eventsForDate)

  if (shift && shift.slots) delete shift.slots
  if (exception && exception.slots) delete exception.slots
  if (schedule && schedule.timetable) delete schedule.timetable
  return {
    date,
    events: eventsForDate,
    schedule,
    shift,
    exception,
    balance,
    timetable
  }
}

function getAttendanceBalance(timetables, events) {

  // TODO: change balance to be for whole day, not individual timetables
  const balance = {
    event: {
      total: events.length,
      standard: 0,
      missing: 0,
      extra: 0
    },
    time: {
      [ATT_BREAK]: {
        standard: 0,
        missing: 0,
        extra: 0
      },
      [ATT_TIMEOFF]: {
        standard: 0,
        missing: 0,
        extra: 0
      },
      [ATT_WORK]: {
        standard: 0,
        missing: 0,
        extra: 0
      }
    }
  }

  timetables.forEach(timetable => {  
    switch (timetable.type_id) {
      case ATT_WORK:
        balance.time[ATT_WORK].standard += differenceInMinutes(timetable.duration, startOfDay(timetable.duration))

        if (!timetable.start_require_event) {
          // registry not required
        } else if (!timetable.start_event) {
          // registry required but not provided
          balance.event.missing += 1
        } else {
          balance.event.standard += 1
          // registry provided, calculate diference
          // placeholder for different time thresholds. Needs to be replaced
          let THRESHOLD_MISSING = 10
          let THRESHOLD_EXTRA = 0
          let startDifference = differenceInMinutes(timetable.start_event, timetable.start_time)

          if (startDifference > 0) {
            if (startDifference > THRESHOLD_MISSING) balance.time[ATT_WORK].missing += startDifference
          } else {
            if (Math.abs(startDifference) > THRESHOLD_EXTRA) balance.time[ATT_WORK].extra += Math.abs(startDifference)
          }
        }
        
        if (!timetable.end_require_event) {
          // registry not required
        } else if (!timetable.end_event) {
          // registry required but not provided
          balance.event.missing += 1
        } else {
          balance.event.standard += 1
          // placeholder for different time thresholds. Needs to be replaced
          let THRESHOLD_MISSING = 10
          let THRESHOLD_EXTRA = 0
          let endDifference = differenceInMinutes(timetable.end_event, timetable.end_event)

          if (endDifference > 0) {
            if (endDifference > THRESHOLD_MISSING) balance.time[ATT_WORK].missing += endDifference
          } else {
            if (Math.abs(endDifference) > THRESHOLD_EXTRA) balance.time[ATT_WORK].extra+= Math.abs(endDifference)
          }
        }

        break
      case ATT_BREAK:
        balance.time[ATT_BREAK].standard += differenceInMinutes(timetable.duration, startOfDay(timetable.duration))
        
        if (!timetable.start_require_event) {
          // registry not required
        } else if (!timetable.start_event) {
          // registry required but not provided
          balance.event.missing += 1
        } else {
          balance.event.standard += 1
          // registry provided, calculate diference
        }
        
        if (!timetable.end_require_event) {
          // registry not required
        } else if (!timetable.end_event) {
          // registry required but not provided
          balance.event.missing += 1
        } else if (timetable.start_event) {
          balance.event.standard += 1
          // placeholder for different time thresholds. Needs to be replaced
          let THRESHOLD = 0
          let endDifference = differenceInMinutes(timetable.end_event, addMinutes(timetable.start_event, differenceInMinutes(timetable.duration, startOfDay(timetable.duration))))
          
          if (endDifference > 0) {
            if (endDifference > THRESHOLD) balance.time[ATT_BREAK].missing += endDifference
          } else {
            if (Math.abs(endDifference) > THRESHOLD) balance.time[ATT_BREAK].extra += Math.abs(endDifference)
          }
        } else {
          throw new Error('Break type timetable requires a start event if there is an end event')
        }

        break
      case ATT_TIMEOFF:
        balance.time[ATT_TIMEOFF].standard += differenceInMinutes(timetable.duration, startOfDay(timetable.duration))

        break
      default:
        throw new Error(`Unsupported att_Type ${timetable.type_id}`)
    }
  })

  balance.event.extra = balance.event.total - balance.event.standard 

  return balance
}


function getEmployeeWithValidShiftsExceptions(employee_id, from, to) {
  // expand range by one day back and two days forward. Will use to make sure we get a next and previous reference that are accurate
  from = subDays(from, 1)
  to = addDays(to, 2)
  return Employee.query().where({ employee_id }).eager('[shifts(onlyValidShift).slots.schedule.timetable, exceptions.slots(onlyValidException).schedule.timetable]', {
    onlyValidShift (query) {
      // filter shifts, get only ones valid for range
      query
        .whereNot('start_date', '>', format(to, 'YYYY-MM-DD'))
        .where(query => query.where('end_date', null).orWhereNot('end_date', '<', format(from, 'YYYY-MM-DD')))
    },
    onlyValidException (query) {
      // filter exceptions, get only ones that are authorized and valid
      query.whereBetween('date', [format(from, 'YYYY-MM-DD'), format(to, 'YYYY-MM-DD')])
    } 
  }).first()
}

function getEmployeePunches(pin, from, to) {
  return knextlite('att_punches')
    .innerJoin('hr_employee', 'hr_employee.id', 'att_punches.emp_id')
    .select(['punch_time', 'terminal_id', 'emp_pin'])
    .where({ 'emp_pin': pin })
    .whereBetween('punch_time', [format(from, 'YYYY-MM-DD'), format(to, 'YYYY-MM-DD')])
}

// combine a date and time
function combineDateAndTime (date, time) {
  if (typeof date === 'string') date = new Date(date)
  if (typeof time === 'string') time = new Date(time)
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds(), 0)
}

function getHalfpointBetweenDates(a, b) {
  if (typeof a === 'string') a = new Date(a)
  if (typeof b === 'string') b = new Date(b)
  return new Date((a.getTime() + b.getTime()) / 2)
}

function getAttendanceTimetable(timetable, references, events) {

  switch (timetable.type_id) {
    case ATT_BREAK:
      let candidateEvents = events.filter(event => isWithinRange(event, timetable.start_time, timetable.end_time)).sort(compareAsc)
      
      return {
        ...timetable,
        start_event: timetable.start_require_event && candidateEvents.length > 0 ? candidateEvents[0] : null,
        end_event: timetable.end_require_event && (candidateEvents.length > 1 || (candidateEvents.length > 0 && !timetable.start_require_event)) ? candidateEvents[candidateEvents.length - 1] : null    
      }
    case ATT_WORK:
      let startRange = getRangeForEvent(timetable.start_time, references)
      let endRange = getRangeForEvent(timetable.end_time, references)
      console.log('start', format(timetable.start_time, 'HH:mm'), format(startRange.start, 'HH:mm'), format(startRange.end, 'HH:mm'))
      console.log('end', format(timetable.end_time, 'HH:mm'), format(endRange.start, 'HH:mm'), format(endRange.end, 'HH:mm'))

      let candidateStartEvents = events.filter(event => isWithinRange(event, startRange.start, startRange.end))
      let candidateEndEvents = events.filter(event => isWithinRange(event, endRange.start, endRange.end))

      return {
        ...timetable,
        start_event: candidateStartEvents && candidateStartEvents.length > 0 ? min(...candidateStartEvents) : null,
        end_event: candidateEndEvents && candidateEndEvents.length > 0 ? max(...candidateEndEvents) : null
      }
    case ATT_TIMEOFF:
      return {
        ...timetable,
        start_event: null,
        end_event: null
      }
    default: throw new Error(`Unsupported attendance type ${timetable.type_id}`)
  }
}

function getRangeForEvent (event, references) {
  let candidateReferences = [startOfDay(event), endOfDay(event)]

  let eventRef = references.find(ref => differenceInCalendarDays(ref.date, event) === 0)

  if (eventRef && eventRef.schedule && eventRef.schedule.timetable) {
    eventRef.schedule.timetable.forEach(timetable => {
      switch (timetable.type_id) {
        case ATT_BREAK:
          if (timetable.start_require_event && timetable.start_time !== null) candidateReferences.push(timetable.start_time)
          if (timetable.end_require_event && timetable.end_time !== null) candidateReferences.push(timetable.end_time)
          break
        case ATT_WORK:
          if (timetable.start_require_event && timetable.start_time !== null && !isSameMinute(event, timetable.start_time)) {
            candidateReferences.push(getHalfpointBetweenDates(event, timetable.start_time))
          }
          if (timetable.end_require_event && timetable.end_time !== null && !isSameMinute(event, timetable.end_time)) {
            candidateReferences.push(getHalfpointBetweenDates(event, timetable.end_time))
          }
          break
        case ATT_TIMEOFF:
    
          break
        default:
          throw new Error(`Unsuported Attendance type ${timetable.type_id}`)
      }
    })
  }

  console.log('Candidates for event', format(event, 'HH:mm'), ...candidateReferences.map(e => format(e, 'HH:mm')))
  return {
    start: max(...candidateReferences.filter(ref => isBefore(ref, event))),
    end: min(...candidateReferences.filter(ref => isAfter(ref, event)))
  }
}

function getRangeForDate(date, references) {
  const startRef = references.find(ref => differenceInCalendarDays(ref.date, subDays(date, 1)) === 0)
  const startCandidates = [startOfDay(date)]
  if (startRef && startRef.schedule && startRef.schedule.timetable) {
    startRef.schedule.timetable.forEach(timetable => {
      if (timetable.start_require_event && timetable.start_time) {
        startCandidates.push(timetable.start_time)
      }
      if (timetable.end_require_event && timetable.end_time) {
        startCandidates.push(timetable.end_time)
      }
    })
  }

  const endRef = references.find(ref => differenceInCalendarDays(ref.date, date) === 0)
  const endCandidates = [endOfDay(date)]
  if (endRef && endRef.schedule && endRef.schedule.timetable) {
    endRef.schedule.timetable.forEach(timetable => {
      if (timetable.start_require_event && timetable.start_time) {
        endCandidates.push(timetable.start_time)
      }
      if (timetable.end_require_event && timetable.end_time) {
        endCandidates.push(timetable.end_time)
      }
    })
  }

  return {
    start: max(...startCandidates),
    end: max(...endCandidates)
  }
}

function getScheduleForDate(date, shifts, exceptions) {
  console.log(date)

  // TODO: sort exceptions  to favor the more recently created ones in case multiple ones cover same date
  const exceptionForDate = exceptions.find(exception => exception.slots.any(slot => isSameDay(slot.date === date)))
  const exceptionScheduleForDate = exceptionForDate && exceptionForDate.slots.any(slot => isSameDay(slot.date, date)) ? exceptionForDate.slots.find(slot => isSameDay(slot.date === date)).schedule : null
  
  const shiftForDate = shifts
    .filter(shift => shift.end_date ? isWithinRange(date, shift.start_date, shift.end_date) : isAfter(date, shift.start_date))
    .sort((a, b) => compareDesc(a.start_date, b.start_date))[0]

  const shiftScheduleForDate = (shiftForDate &&  shiftForDate.slots) ? shiftForDate.slots[differenceInCalendarDays(date, shiftForDate.start_date) % shiftForDate.slots.length].schedule : null

  const scheduleForDate = exceptionScheduleForDate ? exceptionScheduleForDate : shiftScheduleForDate
  
  return {
    date,
    schedule: scheduleForDate ? {
      ...scheduleForDate,
      timetable: scheduleForDate.timetable ? scheduleForDate.timetable.map(t => mapTimetableToExpectedDate(date, t)) : null
    } : null,
    shift: shiftForDate,
    exception: exceptionForDate || null
  }
}

function mapTimetableToExpectedDate(date, { type_id, timetable_name, duration, start_time, start_require_event, end_time, end_require_event }) {
  switch (type_id) {
    case ATT_WORK:
      return {
        type_id,
        date,
        timetable_name,
        duration: combineDateAndTime(date, duration),
        start_time: combineDateAndTime(date, start_time),
        start_require_event,
        end_time: isBefore(end_time, start_time) ? combineDateAndTime(addDays(date, 1), end_time) : combineDateAndTime(date, end_time),
        end_require_event
      }
      case ATT_BREAK:
      return {
        type_id,
        date,
        timetable_name,
        duration: combineDateAndTime(date, duration),
        start_time: combineDateAndTime(date, start_time),
        start_require_event,
        end_time: isBefore(end_time, start_time) ? combineDateAndTime(addDays(date, 1), end_time) : combineDateAndTime(date, end_time),
        end_require_event
      }
      case ATT_TIMEOFF:
      return {
        type_id,
        date,
        timetable_name,
        duration: combineDateAndTime(date, duration),
        start_time,
        start_require_event,
        end_time,
        end_require_event
      }
    default:
      throw new Error(`Unsuported attendance type: ${timetable.type_id}`)
  }
}
