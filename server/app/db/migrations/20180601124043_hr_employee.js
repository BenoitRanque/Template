
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_employee', table => {
    table.uuid('employee_id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.text('external_employee_id')
    table.uuid('user_id')

    table.timestamps()
    
    table.foreign('user_id').references('user_id').inTable('core_users').onUpdate('CASCADE').onDelete('SET NULL')
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_employee')
};
