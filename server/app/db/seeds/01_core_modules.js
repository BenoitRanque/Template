
exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await knex('core_modules').del()

  await knex('core_modules').insert(require('@app/modules').map(module_id => ({ module_id, description: '' })))
}
