
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_att_exception', table => {
    table.uuid('exception_id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.text('exception_external_id')
    table.text('exception_name')
    table.text('description')
    table.uuid('employee_id')

    table.timestamps()

    table.foreign('employee_id').references('employee_id').inTable('hr_employee').onUpdate('CASCADE').onDelete('CASCADE')
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_att_exception')
};
