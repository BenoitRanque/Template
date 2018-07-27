const { ATT_WORK, ATT_EXTRA, ATT_BREAKTIME, ATT_TIMEOFF, ATT_VACATION, ATT_HOLIDAY, ATT_LEAVE_SICK, ATT_LEAVE_PAID, ATT_LEAVE_UNPAID } = require('@tools/attType.js')
const AttTimeType = require('@models/hr/AttTimeType.js')

exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await AttTimeType.query().del()

  await AttTimeType.query().insert([
    { timetype_name: 'Trabajo', code: '', color: '#FFF', category: 'UPTIME', additional: false, accountable: false, paid: true },
    { timetype_name: 'Trabajo Cuidad', code: '', color: '#FFF', category: 'UPTIME', additional: false, accountable: false, paid: true },
    { timetype_name: 'Tiempo Extra', code: '', color: '#FFF', category: 'UPTIME', additional: true, accountable: false, paid: true },
    { timetype_name: 'Almuerzo', code: '', color: '#FFF', category: 'BREAKTIME', additional: false, accountable: false, paid: true },
    { timetype_name: 'Libre', code: '', color: '#FFF', category: 'DOWNTIME', additional: false, accountable: true, paid: true },
    { timetype_name: 'Feriado', code: '', color: '#FFF', category: 'DOWNTIME', additional: false, accountable: true, paid: true },
    { timetype_name: 'Vacacion', code: '', color: '#FFF', category: 'DOWNTIME', additional: false, accountable: true, paid: true },
    { timetype_name: 'Permiso sin Descuento', code: '', color: '#FFF', category: 'DOWNTIME', additional: false, accountable: false, paid: true },
    { timetype_name: 'Permiso con Descuento', code: '', color: '#FFF', category: 'DOWNTIME', additional: false, accountable: false, paid: false },
    { timetype_name: 'Baja Medica', code: '', color: '#FFF', category: 'DOWNTIME', additional: false, accountable: false, paid: true },
    { timetype_name: 'Permiso Por Salud', code: '', color: '#FFF', category: 'DOWNTIME', additional: false, accountable: false, paid: true },
    { timetype_name: 'Permiso Por Defunción', code: '', color: '#FFF', category: 'DOWNTIME', additional: false, accountable: false, paid: true },
    { timetype_name: 'Permiso Por Nacido Vivo ', code: '', color: '#FFF', category: 'DOWNTIME', additional: false, accountable: false, paid: true },
    { timetype_name: 'Cumpleaños', code: '', color: '#FFF', category: 'DOWNTIME', additional: false, accountable: false, paid: true },
    { timetype_name: 'Hora Lactancia', code: '', color: '#FFF', category: 'DOWNTIME', additional: false, accountable: false, paid: true },
  ])
}

