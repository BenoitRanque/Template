
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_employees', table => {
    table.uuid('employee_id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.text('internal_id').index().unique()
    table.text('firstname')
    table.text('lastname')
    table.timestamp('date_of_birth')
    table.enu('sex', ['M', 'F', null])
    table.json('identification_document')
    table.json('contact')
    table.json('address')
    table.uuid('user_id')

    table.timestamps()

    table.foreign('user_id').references('user_id').inTable('core_users').onUpdate('CASCADE').onDelete('SET NULL')
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_employees')
}
