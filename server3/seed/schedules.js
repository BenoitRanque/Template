const DAYOFF = {
  create: {
    category: 'SCH_DAY_OFF',
  }
}

const LUNCH = {
  create: {
    category: 'SCH_REST_LUNCH',
    startTime: 11 * 60,
    startRequireEvent: true,
    endTime: 14.5 * 60,
    endRequireEvent: true,
    duration: 0.5 * 60
  }
}

module.exports = db => Promise.all([
  db.mutation.createSchedule({
    data: {
      name: 'Dia Libre',
      custom: false,
      baseTime: 8 * 60,
      offline1: DAYOFF,
      offline2: DAYOFF
    }
  }, `{ id name }`),
  db.mutation.createSchedule({
    data: {
      name: 'Dia Laboral Continuo 08:30 - 16:30',
      custom: false,
      baseTime: 8 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 8.5 * 60,
          startRequireEvent: true,
          endTime: 16.5 * 60,
          endRequireEvent: true
        }
      },
      restline: LUNCH
    }
  }, `{ id name }`),
  db.mutation.createSchedule({
    data: {
      name: 'Dia Laboral Continuo 09:30 - 17:30',
      custom: false,
      baseTime: 8 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 9.5 * 60,
          startRequireEvent: true,
          endTime: 17.5 * 60,
          endRequireEvent: true
        }
      },
      restline: LUNCH
    }
  }, `{ id name }`),
  db.mutation.createSchedule({
    data: {
      name: 'Dia Laboral Continuo 10:30 - 18:30',
      custom: false,
      baseTime: 8 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 10.5 * 60,
          startRequireEvent: true,
          endTime: 18.5 * 60,
          endRequireEvent: true
        }
      },
      restline: LUNCH
    }
  }, `{ id name }`),
  db.mutation.createSchedule({
    data: {
      name: 'Dia Laboral Continuo 07:00 - 15:00',
      custom: false,
      baseTime: 8 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 7 * 60,
          startRequireEvent: true,
          endTime: 15 * 60,
          endRequireEvent: true
        }
      },
      restline: LUNCH
    }
  }, `{ id name }`),
  db.mutation.createSchedule({
    data: {
      name: 'Dia Laboral Continuo Huerta 08:00 - 18:00',
      custom: false,
      baseTime: 10 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 8 * 60,
          startRequireEvent: true,
          endTime: 18 * 60,
          endRequireEvent: true
        }
      },
      restline: LUNCH
    }
  }, `{ id name }`),
  db.mutation.createSchedule({
    data: {
      name: 'Dia Laboral Continuo Con Hora de Lactancia 09:30 - 16:30',
      custom: false,
      baseTime: 8 * 60,
      timeline: {
        create: [
          {
            category: 'SCH_TIME_MATERNAL',
            startTime: 8.5 * 60,
            startRequireEvent: false,
            endTime: 9.5 * 60,
            endRequireEvent: false
          },
          {
            category: 'SCH_TIME_WORK',
            startTime: 9.5 * 60,
            startRequireEvent: true,
            endTime: 16.5 * 60,
            endRequireEvent: true
          }
        ]
      },
      restline: LUNCH
    }
  }, `{ id name }`),
  db.mutation.createSchedule({
    data: {
      name: 'Dia Laboral Continuo Con Hora de Lactancia 10:30 - 17:30',
      custom: false,
      baseTime: 8 * 60,
      timeline: {
        create: [
          {
            category: 'SCH_TIME_MATERNAL',
            startTime: 9.5 * 60,
            startRequireEvent: false,
            endTime: 10.5 * 60,
            endRequireEvent: false
          },
          {
            category: 'SCH_TIME_WORK',
            startTime: 10.5 * 60,
            startRequireEvent: true,
            endTime: 17.5 * 60,
            endRequireEvent: true
          }
        ]
      },
      restline: LUNCH,

    }
  }, `{ id name }`),
  db.mutation.createSchedule({
    data: {
      name: 'Dia Discontinuo 08:30 - 12:00 14:00 - 18:30',
      custom: false,
      baseTime: 8 * 60,
      timeline: {
        create: [
          {
            category: 'SCH_TIME_WORK',
            startTime: 8.5 * 60,
            startRequireEvent: true,
            endTime: 12 * 60,
            endRequireEvent: true,
          },
          {
            category: 'SCH_TIME_WORK',
            startTime: 14 * 60,
            startRequireEvent: true,
            endTime: 18.5 * 60,
            endRequireEvent: true,
          }
        ]
      },
      restline: [],

    }
  }, `{ id name }`),
  db.mutation.createSchedule({
    data: {
      name: 'Dia Laboral Continuo Bus 11:30 - 18:30',
      custom: false,
      baseTime: 8 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 11.5 * 60,
          startRequireEvent: true,
          endTime: 18.5 * 60,
          endRequireEvent: true
        }
      },
      restline: LUNCH
    }
  }, `{ id name }`),
  db.mutation.createSchedule({
    data: {
      name: 'Medio Dia Laboral 08:30 - 12:30',
      custom: false,
      baseTime: 8 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 8.5 * 60,
          startRequireEvent: true,
          endTime: 12.5 * 60,
          endRequireEvent: true
        }
      },
      offline2: DAYOFF
    }
  }, `{ id name }`),
  db.mutation.createSchedule({
    data: {
      name: 'Medio Dia Laboral 09:30 - 13:30',
      custom: false,
      baseTime: 8 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 9.5 * 60,
          startRequireEvent: true,
          endTime: 13.5 * 60,
          endRequireEvent: true
        }
      },
      offline2: DAYOFF
    }
  }, `{ id name }`),
  db.mutation.createSchedule({
    data: {
      name: 'Medio Dia Laboral 10:30 - 14:30',
      custom: false,
      baseTime: 8 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 10.5 * 60,
          startRequireEvent: true,
          endTime: 14.5 * 60,
          endRequireEvent: true,
        }
      },
      offline2: DAYOFF
    }
  }, `{ id name }`),
  db.mutation.createSchedule({
    data: {
      name: 'Medio Dia Laboral 12:30 - 16:30',
      custom: false,
      baseTime: 8 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 12.5 * 60,
          startRequireEvent: true,
          endTime: 16.5 * 60,
          endRequireEvent: true,
        }
      },
      offline1: DAYOFF
    }
  }, `{ id name }`),
  db.mutation.createSchedule({
    data: {
      name: 'Medio Dia Laboral 13:30 - 17:30',
      custom: false,
      baseTime: 8 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 12.5 * 60,
          startRequireEvent: true,
          endTime: 16.5 * 60,
          endRequireEvent: true,
        }
      },
      offline1: DAYOFF
    }
  }, `{ id name }`),
  db.mutation.createSchedule({
    data: {
      name: 'Medio Dia Laboral 14:30 - 18:30',
      custom: false,
      baseTime: 8 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 12.5 * 60,
          startRequireEvent: true,
          endTime: 16.5 * 60,
          endRequireEvent: true,
        }
      },
      offline1: DAYOFF
    }
  }, `{ id name }`),
  db.mutation.createSchedule({
    data: {
      name: 'Medio Dia Laboral 14:30 - 18:30',
      custom: false,
      baseTime: 8 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 12.5 * 60,
          startRequireEvent: true,
          endTime: 16.5 * 60,
          endRequireEvent: true,
        }
      },
      offline1: DAYOFF
    }
  }, `{ id name }`),
  db.mutation.createSchedule({
    data: {
      name: 'Medio Dia Laboral 7:00 - 11:00',
      custom: false,
      baseTime: 8 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 7 * 60,
          startRequireEvent: true,
          endTime: 11 * 60,
          endRequireEvent: true,
        }
      },
      restline: [],
      offline2: DAYOFF
    }
  }, `{ id name }`),
  db.mutation.createSchedule({
    data: {
      name: 'Medio Dia Laboral 11:00 - 15:00',
      custom: false,
      baseTime: 8 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 11 * 60,
          startRequireEvent: true,
          endTime: 15 * 60,
          endRequireEvent: true,
        }
      },
      offline1: DAYOFF
    }
  }, `{ id name }`),
  db.mutation.createSchedule({
    data: {
      name: 'Medio Dia Laboral Con Hora de Lactancia 10:30 - 13:30',
      custom: false,
      baseTime: 8 * 60,
      timeline: {
        create: [
          {
            category: 'SCH_TIME_MATERNAL',
            startTime: 9.5 * 60,
            startRequireEvent: true,
            endTime: 10.5 * 60,
            endRequireEvent: true,
          },
          {
            category: 'SCH_TIME_WORK',
            startTime: 10.5 * 60,
            startRequireEvent: true,
            endTime: 13.5 * 60,
            endRequireEvent: true,
          }
        ]
      },
      offline2: DAYOFF
    }
  }, `{ id name }`),
  db.mutation.createSchedule({
    data: {
      name: 'Medio Dia Laboral Bus 07:30 - 11:30',
      custom: false,
      baseTime: 8 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 7.5 * 60,
          startRequireEvent: true,
          endTime: 11.5 * 60,
          endRequireEvent: true,
        }
      },
      offline2: DAYOFF
    }
  }, `{ id name }`),
  db.mutation.createSchedule({
    data: {
      name: 'Dia Vacacion',
      custom: false,
      baseTime: 8 * 60,
      offline1: {
        create: {
          category: 'SCH_DAY_VACATION'
        }
      },
      offline2: {
        create: {
          category: 'SCH_DAY_VACATION'
        }
      }
    }
  }, `{ id name }`),
  db.mutation.createSchedule({
    data: {
      name: 'Dia Feriado',
      custom: false,
      baseTime: 8 * 60,
      offline1: {
        create: {
          category: 'SCH_DAY_HOLIDAY'
        }
      },
      offline2: {
        create: {
          category: 'SCH_DAY_HOLIDAY'
        }
      }
    }
  }, `{ id name }`),
])
