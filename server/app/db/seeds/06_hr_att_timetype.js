const { ATT_WORK, ATT_EXTRA, ATT_BREAK, ATT_TIMEOFF, ATT_VACATION, ATT_HOLIDAY, ATT_LEAVE_SICK, ATT_LEAVE_PAID, ATT_LEAVE_UNPAID } = require('@tools/attType.js')
const AttTimeType = require('@models/hr/AttTimeType.js')

exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await AttTimeType.query().del()

  let zeroDate = new Date()
  zeroDate.setHours(0, 0, 0, 0)

  await AttTimeType.query().insert([
    { timetype_id: ATT_TIMEOFF, type_name: 'Tiempo Libre', description: '', code: 'L', color: '#FFF', start_early_threshold: zeroDate, start_late_threshold: zeroDate, end_early_threshold: zeroDate, end_late_threshold: zeroDate  },
    { timetype_id: ATT_WORK, type_name: 'Tiempo Laboral', description: '', code: 'T', color: '#FFF', start_early_threshold: zeroDate, start_late_threshold: zeroDate, end_early_threshold: zeroDate, end_late_threshold: zeroDate  },
    { timetype_id: ATT_BREAK, type_name: 'Almuerzo', description: '', code: 'A', color: '#FFF', start_early_threshold: zeroDate, start_late_threshold: zeroDate, end_early_threshold: zeroDate, end_late_threshold: zeroDate  },
    { timetype_id: ATT_VACATION, type_name: 'Vacacion', description: '', code: 'V', color: '#FFF', start_early_threshold: zeroDate, start_late_threshold: zeroDate, end_early_threshold: zeroDate, end_late_threshold: zeroDate  },
    { timetype_id: ATT_HOLIDAY, type_name: 'Feriado', description: '', code: 'F', color: '#FFF', start_early_threshold: zeroDate, start_late_threshold: zeroDate, end_early_threshold: zeroDate, end_late_threshold: zeroDate  },
    { timetype_id: ATT_EXTRA, type_name: 'Tiempo Extra', description: '', code: 'E', color: '#FFF', start_early_threshold: zeroDate, start_late_threshold: zeroDate, end_early_threshold: zeroDate, end_late_threshold: zeroDate  },
    { timetype_id: ATT_LEAVE_PAID, type_name: 'Permiso sin descuento', description: '', code: 'PSD', color: '#FFF', start_early_threshold: zeroDate, start_late_threshold: zeroDate, end_early_threshold: zeroDate, end_late_threshold: zeroDate  },
    { timetype_id: ATT_LEAVE_UNPAID, type_name: 'Permison con descuento', description: '', code: 'PCD', color: '#FFF', start_early_threshold: zeroDate, start_late_threshold: zeroDate, end_early_threshold: zeroDate, end_late_threshold: zeroDate  },
    { timetype_id: ATT_LEAVE_SICK, type_name: 'Baja medica', description: '', code: 'BM', color: '#FFF', start_early_threshold: zeroDate, start_late_threshold: zeroDate, end_early_threshold: zeroDate, end_late_threshold: zeroDate  }
  ])
}

