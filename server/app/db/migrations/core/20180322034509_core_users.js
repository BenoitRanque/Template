
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('core_users', table => {
    table.uuid('user_id').unique().notNullable().primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.text('username').unique().notNullable()
    table.text('displayname').notNullable()
    table.text('description')
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('core_users')
}
