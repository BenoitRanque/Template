
exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await knex('core_modules').del()

  await knex('core_modules').insert([
    {module_id: 'core', description: 'Core Module'}
  ])
}
