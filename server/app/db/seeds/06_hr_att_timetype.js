const { ATT_WORK, ATT_EXTRA, ATT_BREAK, ATT_TIMEOFF, ATT_VACATION, ATT_HOLIDAY, ATT_LEAVE_SICK, ATT_LEAVE_PAID, ATT_LEAVE_UNPAID } = require('@tools/attType.js')
const AttTimeType = require('@models/hr/AttTimeType.js')

exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await AttTimeType.query().del()

  await AttTimeType.query().insert([
    { timetype_id: ATT_TIMEOFF, timetype_name: 'Tiempo Libre', description: '', code: 'L', color: '#FFF' },
    { timetype_id: ATT_WORK, timetype_name: 'Tiempo Laboral', description: '', code: 'T', color: '#FFF' },
    { timetype_id: ATT_BREAK, timetype_name: 'Almuerzo', description: '', code: 'A', color: '#FFF' },
    { timetype_id: ATT_VACATION, timetype_name: 'Vacacion', description: '', code: 'V', color: '#FFF' },
    { timetype_id: ATT_HOLIDAY, timetype_name: 'Feriado', description: '', code: 'F', color: '#FFF' },
    { timetype_id: ATT_EXTRA, timetype_name: 'Tiempo Extra', description: '', code: 'E', color: '#FFF' },
    { timetype_id: ATT_LEAVE_PAID, timetype_name: 'Permiso sin descuento', description: '', code: 'PSD', color: '#FFF' },
    { timetype_id: ATT_LEAVE_UNPAID, timetype_name: 'Permison con descuento', description: '', code: 'PCD', color: '#FFF' },
    { timetype_id: ATT_LEAVE_SICK, timetype_name: 'Baja medica', description: '', code: 'BM', color: '#FFF' }
  ])
}

