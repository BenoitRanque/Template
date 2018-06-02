
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_employee', table => {
    table.uuid('employee_id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.text('external_employee_id')

    table.timestamps()
    
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_employee')
};
