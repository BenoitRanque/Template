import { date } from 'quasar'
const { buildDate } = date
import ATT from 'assets/attType'
const { ATT_TIMEOFF, ATT_WORK, ATT_BREAK } = ATT
/*
export const someGetter = (state) => {
}
*/

export function breakTimetypesOptions (state) {
  return [
    {
      value: ATT_BREAK,
      label: 'Tiempo Almuerzo'
    }
  ]
}
export function uptimeTimetypesOptions (state) {
  return [
    {
      value: ATT_WORK,
      label: 'Tiempo laboral'
    }
  ]
}
export function downtimeTimetypesOptions (state) {
  return [
    {
      value: ATT_TIMEOFF,
      label: 'Tiempo libre'
    }
  ]
}

const LUNCH = {
  timetype_id: ATT_BREAK,
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
      break: [],
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
      break: [LUNCH],
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
      break: [LUNCH],
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
      break: [LUNCH],
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
      break: [],
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
      break: [],
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
      break: [],
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
      break: [],
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
      break: [],
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
      break: [],
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
      break: [],
      downtime: []
    }
  ]
}
