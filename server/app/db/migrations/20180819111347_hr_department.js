
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_department', table => {
    table.uuid('department_id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.text('department_name')
    table.text('description')
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_department')
}
