
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('core_user_password', table => {
    table.uuid('user_id').notNullable().primary()
    table.text('password').notNullable()

    table.foreign('user_id').references('user_id').inTable('core_users').onUpdate('CASCADE').onDelete('CASCADE')

    table.timestamps()
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('core_user_password')
}
