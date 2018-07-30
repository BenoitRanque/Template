
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_att_exception', table => {
    table.uuid('exception_id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.text('exception_external_id')
    table.text('description')
    table.uuid('owner_id')
    table.uuid('employee_id')

    table.timestamps()

    table.foreign('owner_id').references('user_id').inTable('core_users').onUpdate('CASCADE').onDelete('RESTRICT')
    table.foreign('employee_id').references('employee_id').inTable('hr_employee').onUpdate('CASCADE').onDelete('RESTRICT')
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_att_exception')
};
