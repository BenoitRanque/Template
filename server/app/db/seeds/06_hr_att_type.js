exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await knex('hr_att_type').del()

  await knex('hr_att_type').insert([
    { type_id: 1, type_name: 'Dia Libre', description: '', code: 'L', color: '#FFF' },
    { type_id: 2, type_name: 'Dia Laboral', description: '', code: 'T', color: '#FFF' },
    { type_id: 3, type_name: 'Vacacion', description: '', code: 'V', color: '#FFF' },
    { type_id: 4, type_name: 'Feriado', description: '', code: 'F', color: '#FFF' },
    { type_id: 5, type_name: 'Tiempo Extra', description: '', code: 'E', color: '#FFF' }
  ])
}