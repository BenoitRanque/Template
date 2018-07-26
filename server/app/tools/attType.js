module.exports = {

  ATT_WORK: 11,
  ATT_EXTRA: 12,

  ATT_TIMEOFF: 21,
  ATT_VACATION: 22,
  ATT_HOLIDAY: 23,
  ATT_LEAVE_SICK: 24,
  ATT_LEAVE_PAID: 25,
  ATT_LEAVE_UNPAID: 26,

  ATT_BREAK: 31
  // ATT_ABSENCE: 32, //
  // ATT_ABSENCE_DOUBLE: 33, //

  // ATT_START_LATE: 41,
  // ATT_START_EARLY: 42,
  // ATT_END_LATE: 43,
  // ATT_END_EARLY: 44,
  // ATT_LATE_BREAK: 45
}


// category

// break
// UPTIME
// DOWNTIME

// TRACK


// const timetype = {
//   timetype_id: integer,
//   timetype_name: '',
//   category: 'UPTIME',
//   regular: true, // whether this time is part of regular attendance time
//   track: true, // whether 
// }
// const types = [
//   { timetype_id: 0, timetype_name: 'Trabajo', category: 'UPTIME', regular: true, track: false },
//   { timetype_id: 1, timetype_name: 'Tiempo extra', category: 'UPTIME', regular: false, track: false },
//   { timetype_id: 2, timetype_name: 'Libre', category: 'DOWNTIME', regular: true, track: true },
//   { timetype_id: 3, timetype_name: 'Feriado', category: 'DOWNTIME', regular: true, track: true },
//   { timetype_id: 4, timetype_name: 'Almuerzo', category: 'BREAKTIME', regular: false, track: false },
//   { timetype_id: 5, timetype_name: 'Hora Lactancia', category: 'DOWNTIME', regular: true, track: false },
// ]