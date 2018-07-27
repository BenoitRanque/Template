import { date } from 'quasar'
const { buildDate } = date
import ATT from 'assets/attType'
const { ATT_TIMEOFF, ATT_WORK, ATT_BREAKTIME } = ATT
/*
export const someGetter = (state) => {
}
*/

export function timetypeById (state) {
  return timetypeId => state.timetypes && state.timetypes.length ? state.timetypes.find(t => t.timetype_id === timetypeId) : null
}

export function timeTypes (state) {
  return state.timetypes
}

export function breaktimeTimetypesOptions (state) {
  return state.timetypes && state.timetypes.length ? state.timetypes.filter(t => t.category === 'BREAKTIME').map(t => ({ value: t.timetype_id, label: t.timetype_name })) : []
}
export function uptimeTimetypesOptions (state) {
  return state.timetypes && state.timetypes.length ? state.timetypes.filter(t => t.category === 'UPTIME').map(t => ({ value: t.timetype_id, label: t.timetype_name })) : []
}
export function downtimeTimetypesOptions (state) {
  return state.timetypes && state.timetypes.length ? state.timetypes.filter(t => t.category === 'DOWNTIME').map(t => ({ value: t.timetype_id, label: t.timetype_name })) : []
}

export function subordinateEmployeeOptions (state) {
  return state.subordinateEmployees.map(e => ({
    value: e.employee_id,
    label: e.name_first
  }))
}

export function standardScheduleOptions (state) {
  return state.standardSchedules.map(s => ({
    value: s,
    label: s.schedule_name,
    sublabel: s.description
  }))
}

const LUNCH = {
  timetype_id: ATT_BREAKTIME,
  description: 'Almuerzo',
  start_time: buildDate({hours: 11, minutes: 0, seconds: 0, milliseconds: 0}),
  start_require_event: true,
  end_time: buildDate({hours: 14, minutes: 30, seconds: 0, milliseconds: 0}),
  end_require_event: true,
  duration: buildDate({hours: 0, minutes: 30, seconds: 0, milliseconds: 0})
}
const DAYOFF = {
  description: 'Dia Libre',
  timetype_id: ATT_TIMEOFF,
  value: 1
}
const HALFDAYOFF = {
  description: 'Medio Dia Libre',
  timetype_id: ATT_TIMEOFF,
  value: 0.5
}

export function schedulePresets () {
  return [
    {
      schedule_name: 'Dia Libre',
      description: '',
      uptime: [],
      breaktime: [],
      downtime: [DAYOFF]
    },
    {
      schedule_name: 'Dia Laboral Continuo 08:30 - 16:30',
      description: '',
      uptime: [
        {
          timetype_id: ATT_WORK,
          description: 'Dia Laboral Continuo 08:30 - 16:30',
          start_time: buildDate({hours: 8, minutes: 30, seconds: 0, milliseconds: 0}),
          start_require_event: true,
          end_time: buildDate({hours: 16, minutes: 30, seconds: 0, milliseconds: 0}),
          end_require_event: true,
          value: 1
        }
      ],
      breaktime: [LUNCH],
      downtime: []
    },
    {
      schedule_name: 'Dia Laboral Continuo 09:30 - 17:30',
      description: '',
      uptime: [
        {
          timetype_id: ATT_WORK,
          description: 'Dia Laboral Continuo 09:30 - 17:30',
          start_time: buildDate({hours: 9, minutes: 30, seconds: 0, milliseconds: 0}),
          start_require_event: true,
          end_time: buildDate({hours: 17, minutes: 30, seconds: 0, milliseconds: 0}),
          end_require_event: true,
          value: 1
        }
      ],
      breaktime: [LUNCH],
      downtime: []
    },
    {
      schedule_name: 'Dia Laboral Continuo 10:30 - 18:30',
      description: '',
      uptime: [
        {
          timetype_id: ATT_WORK,
          description: 'Dia Laboral Continuo 10:30 - 18:30',
          start_time: buildDate({hours: 10, minutes: 30, seconds: 0, milliseconds: 0}),
          start_require_event: true,
          end_time: buildDate({hours: 18, minutes: 30, seconds: 0, milliseconds: 0}),
          end_require_event: true,
          value: 1
        }
      ],
      breaktime: [LUNCH],
      downtime: []
    },
    {
      schedule_name: 'Medio Dia Laboral 08:30 - 12:30',
      description: '',
      uptime: [
        {
          timetype_id: ATT_WORK,
          description: 'Medio Dia Laboral 08:30 - 12:30',
          start_time: buildDate({hours: 8, minutes: 30, seconds: 0, milliseconds: 0}),
          start_require_event: true,
          end_time: buildDate({hours: 12, minutes: 30, seconds: 0, milliseconds: 0}),
          end_require_event: true,
          value: 0.5
        }
      ],
      breaktime: [],
      downtime: [HALFDAYOFF]
    },
    {
      schedule_name: 'Medio Dia Laboral 09:30 - 13:30',
      description: '',
      uptime: [
        {
          timetype_id: ATT_WORK,
          description: 'Medio Dia Laboral 09:30 - 13:30',
          start_time: buildDate({hours: 9, minutes: 30, seconds: 0, milliseconds: 0}),
          start_require_event: true,
          end_time: buildDate({hours: 13, minutes: 30, seconds: 0, milliseconds: 0}),
          end_require_event: true,
          value: 0.5
        }
      ],
      breaktime: [],
      downtime: [HALFDAYOFF]
    },
    {
      schedule_name: 'Medio Dia Laboral 10:30 - 14:30',
      description: '',
      uptime: [
        {
          timetype_id: ATT_WORK,
          description: 'Medio Dia Laboral 10:30 - 14:30',
          start_time: buildDate({hours: 10, minutes: 30, seconds: 0, milliseconds: 0}),
          start_require_event: true,
          end_time: buildDate({hours: 14, minutes: 30, seconds: 0, milliseconds: 0}),
          end_require_event: true,
          value: 0.5
        }
      ],
      breaktime: [],
      downtime: [HALFDAYOFF]
    },
    {
      schedule_name: 'Medio Dia Laboral 12:30 - 16:30',
      description: '',
      uptime: [
        {
          timetype_id: ATT_WORK,
          description: 'Medio Dia Laboral 12:30 - 16:30',
          start_time: buildDate({hours: 12, minutes: 30, seconds: 0, milliseconds: 0}),
          start_require_event: true,
          end_time: buildDate({hours: 16, minutes: 30, seconds: 0, milliseconds: 0}),
          end_require_event: true,
          value: 0.5
        }
      ],
      breaktime: [],
      downtime: [HALFDAYOFF]
    },
    {
      schedule_name: 'Medio Dia Laboral 13:30 - 17:30',
      description: '',
      uptime: [
        {
          timetype_id: ATT_WORK,
          description: 'Medio Dia Laboral 13:30 - 17:30',
          start_time: buildDate({hours: 13, minutes: 30, seconds: 0, milliseconds: 0}),
          start_require_event: true,
          end_time: buildDate({hours: 17, minutes: 30, seconds: 0, milliseconds: 0}),
          end_require_event: true,
          value: 0.5
        }
      ],
      breaktime: [],
      downtime: [HALFDAYOFF]
    },
    {
      schedule_name: 'Medio Dia Laboral 14:30 - 18:30',
      description: '',
      uptime: [
        {
          timetype_id: ATT_WORK,
          description: 'Medio Dia Laboral 14:30 - 18:30',
          start_time: buildDate({hours: 14, minutes: 30, seconds: 0, milliseconds: 0}),
          start_require_event: true,
          end_time: buildDate({hours: 18, minutes: 30, seconds: 0, milliseconds: 0}),
          end_require_event: true,
          value: 0.5
        }
      ],
      breaktime: [],
      downtime: [HALFDAYOFF]
    },
    {
      schedule_name: 'Dia Discontinuo 08:30 - 12:00 14:00 18:30',
      description: '',
      uptime: [
        {
          timetype_id: ATT_WORK,
          description: 'Mañana Laboral 08:30 - 12:00',
          start_time: buildDate({hours: 8, minutes: 30, seconds: 0, milliseconds: 0}),
          start_require_event: true,
          end_time: buildDate({hours: 12, minutes: 0, seconds: 0, milliseconds: 0}),
          end_require_event: true,
          value: 0.4375
        },
        {
          timetype_id: ATT_WORK,
          description: 'Tarde Laboral 14:00 - 18:30',
          start_time: buildDate({hours: 14, minutes: 0, seconds: 0, milliseconds: 0}),
          start_require_event: true,
          end_time: buildDate({hours: 18, minutes: 30, seconds: 0, milliseconds: 0}),
          end_require_event: true,
          value: 0.5625
        }
      ],
      breaktime: [],
      downtime: []
    }
  ]
}
