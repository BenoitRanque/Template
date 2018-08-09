const { ATT_WORK, ATT_EXTRA, ATT_BREAKTIME, ATT_TIMEOFF, ATT_VACATION, ATT_HOLIDAY, ATT_LEAVE_SICK, ATT_LEAVE_PAID, ATT_LEAVE_UNPAID } = require('@tools/attType.js')
const AttTimeType = require('@models/hr/AttTimeType.js')

exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await AttTimeType.query().del()

  await AttTimeType.query().insert([
    { timetype_name: 'Trabajo', code: 'T', color: '#FFF', category: 'UPTIME', additional: false, accountable: false, paid: true, vacation: false },
    { timetype_name: 'Trabajo Cuidad', code: 'TC', color: '#FFF', category: 'UPTIME', additional: false, accountable: false, paid: true, vacation: false },
    { timetype_name: 'Tiempo Extra', code: 'TE', color: '#FFF', category: 'UPTIME', additional: true, accountable: false, paid: true, vacation: false },
    { timetype_name: 'Almuerzo', code: 'A', color: '#FFF', category: 'BREAKTIME', additional: false, accountable: false, paid: true, vacation: false },
    { timetype_name: 'Libre', code: 'L', color: '#FFF', category: 'DOWNTIME', additional: false, accountable: true, paid: true, vacation: false },
    { timetype_name: 'Feriado', code: 'F', color: '#FFF', category: 'DOWNTIME', additional: false, accountable: true, paid: true, vacation: false },
    { timetype_name: 'Vacacion', code: 'V', color: '#FFF', category: 'DOWNTIME', additional: false, accountable: true, paid: true, vacation: true },
    { timetype_name: 'Permiso sin Descuento', code: 'PsD', color: '#FFF', category: 'DOWNTIME', additional: false, accountable: false, paid: true, vacation: false },
    { timetype_name: 'Permiso con Descuento', code: 'PcD', color: '#FFF', category: 'DOWNTIME', additional: false, accountable: false, paid: false, vacation: false },
    { timetype_name: 'Baja Medica', code: 'BM', color: '#FFF', category: 'DOWNTIME', additional: false, accountable: false, paid: true, vacation: false },
    { timetype_name: 'Permiso Por Salud', code: '', color: '#FFF', category: 'DOWNTIME', additional: false, accountable: false, paid: true, vacation: false },
    { timetype_name: 'Permiso Por Defunción', code: '', color: '#FFF', category: 'DOWNTIME', additional: false, accountable: false, paid: true, vacation: false },
    { timetype_name: 'Permiso Por Nacido Vivo ', code: '', color: '#FFF', category: 'DOWNTIME', additional: false, accountable: false, paid: true, vacation: false },
    { timetype_name: 'Cumpleaños', code: '', color: '#FFF', category: 'DOWNTIME', additional: false, accountable: false, paid: true, vacation: false },
    { timetype_name: 'Hora Lactancia', code: '', color: '#FFF', category: 'DOWNTIME', additional: false, accountable: false, paid: true, vacation: false },
  ])
}

