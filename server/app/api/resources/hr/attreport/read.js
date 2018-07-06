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
const eachDay = require('date-fns/each_day')
const startOfDay = require('date-fns/start_of_day')
const endOfDay = require('date-fns/end_of_day')
const addDays = require('date-fns/add_days')
const subDays = require('date-fns/sub_days')
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

  return {
    // punches,
    attendance
  }
}

function getAttendanceForDate(date, references, events) {

  let { schedule, exception, shift } = references.find(ref => isSameDay(ref.date, date))
  let timetable = schedule.timetable.map(t => getAttendanceTimetable(t, references, events))
  let balance = getAttendanceBalance(timetable)

  delete shift.slots
  if (exception && exception.slots) delete exception.slots
  return {
    date,
    schedule,
    shift,
    exception,
    balance,
    timetable
  }
}

function getAttendanceBalance(timetables) {
  const balance = []

  timetables.forEach(timetable => {
    let balanceForType = balance.find(b => b.type_id === timetable.type_id)
    if (balanceForType === undefined) {
      balanceForType = {
        type_id: timetable.type_id,
        missing_time: 0,
        missing_event: 0,
        standard_time: 0,
        extra_time: 0,
        extra_event: 0
      }
      balance.push(balanceForType)
    }
    
    switch (timetable.type_id) {
      case ATT_WORK:
        balanceForType.standard_time += differenceInMinutes(timetable.duration, startOfDay(timetable.duration))

        // add unused events 
        balanceForType.extra_event += timetable.events.filter(e => !(timetable.start_event && isSameMinute(e, timetable.start_event)) && !(timetable.end_event && isSameMinute(e, timetable.end_event))).length

        if (!timetable.start_register) {
          // registry not required
        } else if (!timetable.start_event) {
          // registry required but not provided
          balanceForType.missing_event += 1
        } else {
          // registry provided, calculate diference
          // placeholder for different time thresholds. Needs to be replaced
          let THRESHOLD = 0
          let startDifference = differenceInMinutes(timetable.start_event, timetable.start_time)

          if (startDifference > 0) {
            if (startDifference > THRESHOLD) balanceForType.missing_time += startDifference
          } else {
            if (Math.abs(startDifference) > THRESHOLD) balanceForType.extra_time += Math.abs(startDifference)
          }
        }
        
        if (!timetable.end_register) {
          // registry not required
        } else if (!timetable.end_event) {
          // registry required but not provided
          balanceForType.missing_event += 1
        } else {
          // placeholder for different time thresholds. Needs to be replaced
          let THRESHOLD = 0
          let endDifference = differenceInMinutes(timetable.end_event, timetable.end_event)

          if (endDifference > 0) {
            if (endDifference > THRESHOLD) balanceForType.missing_time += endDifference
          } else {
            if (Math.abs(endDifference) > THRESHOLD) balanceForType.extra_time += Math.abs(endDifference)
          }
        }

        break
      case ATT_BREAK:
        balanceForType.standard_time += differenceInMinutes(timetable.duration, startOfDay(timetable.duration))
        
        // add unused events 
        balanceForType.extra_event += timetable.events.filter(e => !(timetable.start_event && isSameMinute(e, timetable.start_event)) && !(timetable.end_event && isSameMinute(e, timetable.end_event))).length
        
        if (!timetable.start_register) {
          // registry not required
        } else if (!timetable.start_event) {
          // registry required but not provided
          balanceForType.missing_event += 1
        } else {
          // registry provided, calculate diference
        }
        
        if (!timetable.end_register) {
          // registry not required
        } else if (!timetable.end_event) {
          // registry required but not provided
          balanceForType.missing_event += 1
        } else if (timetable.start_event) {
          // placeholder for different time thresholds. Needs to be replaced
          let THRESHOLD = 0
          let endDifference = differenceInMinutes(timetable.end_event, addMinutes(timetable.start_event, differenceInMinutes(timetable.duration, startOfDay(timetable.duration))))
          
          if (endDifference > 0) {
            if (endDifference > THRESHOLD) balanceForType.missing_time += endDifference
          } else {
            if (Math.abs(endDifference) > THRESHOLD) balanceForType.extra_time += Math.abs(endDifference)
          }
        } else {
          throw new Error('Break type timetable requires a start event if there is an end event')
        }

        break
      case ATT_TIMEOFF:       
        balanceForType.standard_time += differenceInMinutes(timetable.duration, startOfDay(timetable.duration))
        
        // add unused events 
        balanceForType.extra_event += timetable.events.filter(e => !(timetable.start_event && isSameMinute(e, timetable.start_event)) && !(timetable.end_event && isSameMinute(e, timetable.end_event))).length
        
        break
      default:
        throw new Error(`Unsupported att_Type ${timetable.type_id}`)
    }
  })

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
  return new Date(date.getFullYear(), date.getMonth(), date.getDay(), time.getHours(), time.getMinutes(), time.getSeconds(), 0)
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
        events: candidateEvents,
        start_event: timetable.start_register && candidateEvents.length > 0 ? candidateEvents[0] : null,
        end_event: timetable.end_register && (candidateEvents.length > 1 || (candidateEvents.length > 0 && !timetable.start_register)) ? candidateEvents[candidateEvents.length - 1] : null    
      }
    case ATT_WORK:
      let startReference = getClosestReferences(timetable.start_time, references)
      let endReference = getClosestReferences(timetable.end_time, references)
      console.log('start', timetable.start_time, startReference)
      console.log('end', timetable.end_time, endReference)

      let candidateStartEvents = events.filter(event => isWithinRange(event, startReference.previous, startReference.next)).sort(compareAsc)
      let candidateEndEvents = events.filter(event => isWithinRange(event, endReference.previous, endReference.next)).sort(compareDesc)

      return {
        ...timetable,
        events: [...candidateStartEvents, ...candidateEndEvents.sort(compareAsc)],
        start_event: candidateStartEvents.length > 0 ? candidateStartEvents[0] : null,
        end_event: candidateEndEvents.length > 0 ? candidateEndEvents[0] : null
      }
    case ATT_TIMEOFF:
      return {
        ...timetable,
        events: [],
        start_event: null,
        end_event: null
      }
    default: throw new Error(`Unsupported attendance type ${timetable.type_id}`)
  }
}

function getClosestReferences (event, references) {
  let candidateReferences = []

  references.find(ref => differenceInCalendarDays(ref.date, event) === 0).schedule.timetable.forEach(timetable => {
    switch (timetable.type_id) {
      case ATT_BREAK:
        if (timetable.start_time !== null) candidateReferences.push(timetable.start_time)
        if (timetable.end_time !== null) candidateReferences.push(timetable.end_time)
        break
      case ATT_WORK:
        if (timetable.start_time !== null && !isSameMinute(event, timetable.start_time)) {
          candidateReferences.push(getHalfpointBetweenDates(event, timetable.start_time))
        }
        if (timetable.end_time !== null && !isSameMinute(event, timetable.end_time)) {
          candidateReferences.push(getHalfpointBetweenDates(event, timetable.end_time))
        }
        break
      case ATT_TIMEOFF:
  
        break
      default:
        throw new Error(`Unsuported Attendance type ${timetable.type_id}`)
    }
  })

  let previousCandidates = candidateReferences.filter(ref => isBefore(ref, event))
  let nextCandidates = candidateReferences.filter(ref => isAfter(ref, event))

  previousCandidates.push(startOfDay(event))
  nextCandidates.push(endOfDay(event))

  return {
    event,
    candidateReferences,
    previousCandidates,
    nextCandidates,
    previous: previousCandidates.sort(compareDesc)[0],
    next: nextCandidates.sort(compareAsc)[0]
  }
}

function getScheduleForDate(date, shifts, exceptions) {

  // TODO: sort exceptions  to favor the more recently created ones in case multiple ones cover same date
  const exceptionForDate = exceptions.find(exception => exception.slots.any(slot => isSameDay(slot.date === date)))
  const exceptionScheduleForDate = exceptionForDate && exceptionForDate.slots.any(slot => isSameDay(slot.date, date)) ? exceptionForDate.slots.find(slot => isSameDay(slot.date === date)).schedule : null
  
  if (exceptionScheduleForDate && exceptionScheduleForDate.timetable) {
    exceptionScheduleForDate.timetable = exceptionScheduleForDate.timetable.map(t => mapTimetableToExpectedDate(date, t))
  }

  const shiftForDate = shifts
    .filter(shift => shift.end_date ? isWithinRange(date, shift.start_date, shift.end_date) : isAfter(date, shift.start_date))
    .sort((a, b) => compareDesc(a.start_date, b.start_date))[0]

  const shiftScheduleForDate = (shiftForDate &&  shiftForDate.slots) ? shiftForDate.slots[differenceInCalendarDays(date, shiftForDate.start_date) % shiftForDate.slots.length].schedule : null
  
  if (shiftScheduleForDate && shiftScheduleForDate.timetable) {
    shiftScheduleForDate.timetable = shiftScheduleForDate.timetable.map(t => mapTimetableToExpectedDate(date, t))
  }

  const scheduleForDate = exceptionScheduleForDate ? exceptionScheduleForDate : shiftScheduleForDate 
 
  return {
    date,
    schedule: scheduleForDate,
    shift: shiftForDate,
    exception: exceptionForDate || null
  }
}

function mapTimetableToExpectedDate(date, { type_id, timetable_name, duration, start_time, start_register, end_time, end_register }) {
  switch (type_id) {
    case ATT_WORK:
      return {
        type_id,
        timetable_name,
        duration: combineDateAndTime(date, duration),
        start_time: combineDateAndTime(date, start_time),
        start_register,
        end_time: isBefore(end_time, start_time) ? combineDateAndTime(addDays(date, 1), end_time) : combineDateAndTime(date, end_time),
        end_register
      }
    case ATT_BREAK:
      return {
        type_id,
        timetable_name,
        duration: combineDateAndTime(date, duration),
        start_time: combineDateAndTime(date, start_time),
        start_register,
        end_time: isBefore(end_time, start_time) ? combineDateAndTime(addDays(date, 1), end_time) : combineDateAndTime(date, end_time),
        end_register
      }
    case ATT_TIMEOFF:
      return {
        type_id,
        timetable_name,
        duration: combineDateAndTime(date, duration),
        start_time,
        start_register,
        end_time,
        end_register
      }
    default:
      throw new Error(`Unsuported attendance type: ${timetable.type_id}`)
  }
}
