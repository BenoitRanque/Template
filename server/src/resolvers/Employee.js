const {
  loadAttendanceReport,
  loadCalendarDate,
  loadCalendarDates,
  loadCalendarRange,
  loadVacationSchedules,
  getVacationSchedule
} = require('../utils.js')

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
  calendarDates: {
    fragment: `fragment EmployeeID on Employee { id }`, // fragment ensures requires parent object properties will be present
    resolve: async (obj, args, ctx, info) => loadCalendarDates(obj, args, ctx, info)
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
