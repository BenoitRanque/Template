
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('core_roles', table => {
    table.uuid('role_id').unique().notNullable().primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.string('name').unique().notNullable()
    table.text('description')
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('core_roles')
}
