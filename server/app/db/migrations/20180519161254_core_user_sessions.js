
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('core_user_sessions', table => {
    table.text('session_id').primary()
    table.uuid('user_id').notNullable().index()
    table.json('data').notNullable()
    table.timestamp('expires').notNullable().index();
    
    table.foreign('user_id').references('user_id').inTable('core_users').onUpdate('CASCADE').onDelete('CASCADE')

    table.timestamps()
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('core_user_sessions')
}
