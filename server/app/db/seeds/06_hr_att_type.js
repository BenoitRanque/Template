const { ATT_WORK, ATT_EXTRA, ATT_BREAK, ATT_TIMEOFF, ATT_VACATION, ATT_HOLIDAY, ATT_LEAVE_SICK, ATT_LEAVE_PAID, ATT_LEAVE_UNPAID } = require('@tools/attType.js')

exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await knex('hr_att_type').del()

  await knex('hr_att_type').insert([
    { type_id: ATT_TIMEOFF, type_name: 'Dia Libre', description: '', code: 'C', color: '#FFF' },
    { type_id: ATT_WORK, type_name: 'Dia Laboral', description: '', code: 'T', color: '#FFF' },
    { type_id: ATT_BREAK, type_name: 'Almuerzo', description: '', code: 'A', color: '#FFF' },
    { type_id: ATT_VACATION, type_name: 'Vacacion', description: '', code: 'V', color: '#FFF' },
    { type_id: ATT_HOLIDAY, type_name: 'Feriado', description: '', code: 'F', color: '#FFF' },
    { type_id: ATT_EXTRA, type_name: 'Tiempo Extra', description: '', code: 'E', color: '#FFF' },
    { type_id: ATT_LEAVE_PAID, type_name: 'Permiso sin descuento', description: '', code: 'PSD', color: '#FFF' },
    { type_id: ATT_LEAVE_UNPAID, type_name: 'Permison con descuento', description: '', code: 'PCD', color: '#FFF' },
    { type_id: ATT_LEAVE_SICK, type_name: 'Baja medica', description: '', code: 'BM', color: '#FFF' }
  ])
}

