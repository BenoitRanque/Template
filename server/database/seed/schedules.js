const DAYOFF = {
  create: {
    category: 'SCH_DAY_OFF',
  }
}

const LUNCH = {
  create: {
    category: 'SCH_REST_LUNCH',
    startTime: 11 * 60,
    startEventRequired: true,
    endTime: 14.5 * 60,
    endEventRequired: true,
    duration: 0.5 * 60
  }
}

module.exports = db => Promise.all([
  db.mutation.createSchedule({
    data: {
      description: 'Dia Libre',
      systemScheduleIdentifier: 'SYS_SCH_DAYOFF_DAYOFF',
      isPreset: true,
      baseTime: 8 * 60,
      offline1: DAYOFF,
      offline2: DAYOFF
    }
  }, `{ id description }`),
  db.mutation.createSchedule({
    data: {
      description: 'Dia Laboral Continuo 08:30 - 16:30',
      isPreset: true,
      baseTime: 8 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 8.5 * 60,
          startEventRequired: true,
          endTime: 16.5 * 60,
          endEventRequired: true
        }
      },
      restline: LUNCH
    }
  }, `{ id description }`),
  db.mutation.createSchedule({
    data: {
      description: 'Dia Laboral Continuo 09:30 - 17:30',
      isPreset: true,
      baseTime: 8 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 9.5 * 60,
          startEventRequired: true,
          endTime: 17.5 * 60,
          endEventRequired: true
        }
      },
      restline: LUNCH
    }
  }, `{ id description }`),
  db.mutation.createSchedule({
    data: {
      description: 'Dia Laboral Continuo 10:30 - 18:30',
      isPreset: true,
      baseTime: 8 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 10.5 * 60,
          startEventRequired: true,
          endTime: 18.5 * 60,
          endEventRequired: true
        }
      },
      restline: LUNCH
    }
  }, `{ id description }`),
  db.mutation.createSchedule({
    data: {
      description: 'Dia Laboral Continuo 07:00 - 15:00',
      isPreset: true,
      baseTime: 8 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 7 * 60,
          startEventRequired: true,
          endTime: 15 * 60,
          endEventRequired: true
        }
      },
      restline: LUNCH
    }
  }, `{ id description }`),
  db.mutation.createSchedule({
    data: {
      description: 'Dia Laboral Continuo Huerta 08:00 - 18:00',
      isPreset: true,
      baseTime: 10 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 8 * 60,
          startEventRequired: true,
          endTime: 18 * 60,
          endEventRequired: true
        }
      },
      restline: LUNCH
    }
  }, `{ id description }`),
  db.mutation.createSchedule({
    data: {
      description: 'Dia Laboral Continuo Con Hora de Lactancia 09:30 - 16:30',
      isPreset: true,
      baseTime: 8 * 60,
      timeline: {
        create: [
          {
            category: 'SCH_TIME_MATERNAL',
            startTime: 8.5 * 60,
            startEventRequired: false,
            endTime: 9.5 * 60,
            endEventRequired: false
          },
          {
            category: 'SCH_TIME_WORK',
            startTime: 9.5 * 60,
            startEventRequired: true,
            endTime: 16.5 * 60,
            endEventRequired: true
          }
        ]
      },
      restline: LUNCH
    }
  }, `{ id description }`),
  db.mutation.createSchedule({
    data: {
      description: 'Dia Laboral Continuo Con Hora de Lactancia 10:30 - 17:30',
      isPreset: true,
      baseTime: 8 * 60,
      timeline: {
        create: [
          {
            category: 'SCH_TIME_MATERNAL',
            startTime: 9.5 * 60,
            startEventRequired: false,
            endTime: 10.5 * 60,
            endEventRequired: false
          },
          {
            category: 'SCH_TIME_WORK',
            startTime: 10.5 * 60,
            startEventRequired: true,
            endTime: 17.5 * 60,
            endEventRequired: true
          }
        ]
      },
      restline: LUNCH,

    }
  }, `{ id description }`),
  db.mutation.createSchedule({
    data: {
      description: 'Dia Discontinuo 08:30 - 12:00 14:00 - 18:30',
      isPreset: true,
      baseTime: 8 * 60,
      timeline: {
        create: [
          {
            category: 'SCH_TIME_WORK',
            startTime: 8.5 * 60,
            startEventRequired: true,
            endTime: 12 * 60,
            endEventRequired: true,
          },
          {
            category: 'SCH_TIME_WORK',
            startTime: 14 * 60,
            startEventRequired: true,
            endTime: 18.5 * 60,
            endEventRequired: true,
          }
        ]
      },
      restline: [],

    }
  }, `{ id description }`),
  db.mutation.createSchedule({
    data: {
      description: 'Dia Laboral Continuo Bus 11:30 - 18:30',
      isPreset: true,
      baseTime: 8 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 11.5 * 60,
          startEventRequired: true,
          endTime: 18.5 * 60,
          endEventRequired: true
        }
      },
      restline: LUNCH
    }
  }, `{ id description }`),
  db.mutation.createSchedule({
    data: {
      description: 'Medio Dia Laboral 08:30 - 12:30',
      isPreset: true,
      baseTime: 8 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 8.5 * 60,
          startEventRequired: true,
          endTime: 12.5 * 60,
          endEventRequired: true
        }
      },
      offline2: DAYOFF
    }
  }, `{ id description }`),
  db.mutation.createSchedule({
    data: {
      description: 'Medio Dia Laboral 09:30 - 13:30',
      isPreset: true,
      baseTime: 8 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 9.5 * 60,
          startEventRequired: true,
          endTime: 13.5 * 60,
          endEventRequired: true
        }
      },
      offline2: DAYOFF
    }
  }, `{ id description }`),
  db.mutation.createSchedule({
    data: {
      description: 'Medio Dia Laboral 10:30 - 14:30',
      isPreset: true,
      baseTime: 8 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 10.5 * 60,
          startEventRequired: true,
          endTime: 14.5 * 60,
          endEventRequired: true,
        }
      },
      offline2: DAYOFF
    }
  }, `{ id description }`),
  db.mutation.createSchedule({
    data: {
      description: 'Medio Dia Laboral 12:30 - 16:30',
      isPreset: true,
      baseTime: 8 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 12.5 * 60,
          startEventRequired: true,
          endTime: 16.5 * 60,
          endEventRequired: true,
        }
      },
      offline1: DAYOFF
    }
  }, `{ id description }`),
  db.mutation.createSchedule({
    data: {
      description: 'Medio Dia Laboral 13:30 - 17:30',
      isPreset: true,
      baseTime: 8 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 12.5 * 60,
          startEventRequired: true,
          endTime: 16.5 * 60,
          endEventRequired: true,
        }
      },
      offline1: DAYOFF
    }
  }, `{ id description }`),
  db.mutation.createSchedule({
    data: {
      description: 'Medio Dia Laboral 14:30 - 18:30',
      isPreset: true,
      baseTime: 8 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 12.5 * 60,
          startEventRequired: true,
          endTime: 16.5 * 60,
          endEventRequired: true,
        }
      },
      offline1: DAYOFF
    }
  }, `{ id description }`),
  db.mutation.createSchedule({
    data: {
      description: 'Medio Dia Laboral 14:30 - 18:30',
      isPreset: true,
      baseTime: 8 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 12.5 * 60,
          startEventRequired: true,
          endTime: 16.5 * 60,
          endEventRequired: true,
        }
      },
      offline1: DAYOFF
    }
  }, `{ id description }`),
  db.mutation.createSchedule({
    data: {
      description: 'Medio Dia Laboral 7:00 - 11:00',
      isPreset: true,
      baseTime: 8 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 7 * 60,
          startEventRequired: true,
          endTime: 11 * 60,
          endEventRequired: true,
        }
      },
      restline: [],
      offline2: DAYOFF
    }
  }, `{ id description }`),
  db.mutation.createSchedule({
    data: {
      description: 'Medio Dia Laboral 11:00 - 15:00',
      isPreset: true,
      baseTime: 8 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 11 * 60,
          startEventRequired: true,
          endTime: 15 * 60,
          endEventRequired: true,
        }
      },
      offline1: DAYOFF
    }
  }, `{ id description }`),
  db.mutation.createSchedule({
    data: {
      description: 'Medio Dia Laboral Con Hora de Lactancia 10:30 - 13:30',
      isPreset: true,
      baseTime: 8 * 60,
      timeline: {
        create: [
          {
            category: 'SCH_TIME_MATERNAL',
            startTime: 9.5 * 60,
            startEventRequired: true,
            endTime: 10.5 * 60,
            endEventRequired: true,
          },
          {
            category: 'SCH_TIME_WORK',
            startTime: 10.5 * 60,
            startEventRequired: true,
            endTime: 13.5 * 60,
            endEventRequired: true,
          }
        ]
      },
      offline2: DAYOFF
    }
  }, `{ id description }`),
  db.mutation.createSchedule({
    data: {
      description: 'Medio Dia Laboral Bus 07:30 - 11:30',
      isPreset: true,
      baseTime: 8 * 60,
      timeline: {
        create: {
          category: 'SCH_TIME_WORK',
          startTime: 7.5 * 60,
          startEventRequired: true,
          endTime: 11.5 * 60,
          endEventRequired: true,
        }
      },
      offline2: DAYOFF
    }
  }, `{ id description }`),
  db.mutation.createSchedule({
    data: {
      description: 'Dia Feriado',
      isPreset: true,
      systemScheduleIdentifier: 'SYS_SCH_HOLIDAY_HOLIDAY',
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
  }, `{ id description }`),
  db.mutation.createSchedule({
    data: {
      description: 'Dia Vacacion',
      isPreset: true,
      systemScheduleIdentifier: 'SYS_SCH_VACATION_VACATION',
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
  }, `{ id description }`),
  db.mutation.createSchedule({
    data: {
      description: 'Mañana Libre Tarde Vacacion',
      isPreset: true,
      systemScheduleIdentifier: 'SYS_SCH_DAYOFF_VACATION',
      baseTime: 8 * 60,
      offline1: {
        create: {
          category: 'SCH_DAY_OFF'
        }
      },
      offline2: {
        create: {
          category: 'SCH_DAY_VACATION'
        }
      }
    }
  }, `{ id description }`),
  db.mutation.createSchedule({
    data: {
      description: 'Mañana Vacacion Tarde Libre',
      isPreset: true,
      systemScheduleIdentifier: 'SYS_SCH_VACATION_DAYOFF',
      baseTime: 8 * 60,
      offline1: {
        create: {
          category: 'SCH_DAY_VACATION'
        }
      },
      offline2: {
        create: {
          category: 'SCH_DAY_OFF'
        }
      }
    }
  }, `{ id description }`),
])
