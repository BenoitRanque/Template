
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_employee_contact', table => {
    table.uuid('contact_id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.text('description')
    table.text('type')
    table.text('value')
    table.boolean('emergency_contact').defaultTo(false)
    table.uuid('employee_id')

    table.timestamps()

    table.foreign('employee_id').references('employee_id').inTable('hr_employee').onUpdate('CASCADE').onDelete('CASCADE')

  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_employee_contact')
};
