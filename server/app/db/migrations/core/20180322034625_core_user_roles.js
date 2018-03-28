
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('core_user_roles', table => {
    table.uuid('user_id')
    table.uuid('role_id')
    table.uuid('grantor_id')

    table.foreign('user_id').references('user_id').inTable('core_users').onUpdate('CASCADE').onDelete('CASCADE')
    table.foreign('role_id').references('role_id').inTable('core_roles').onUpdate('CASCADE').onDelete('CASCADE')
    table.foreign('grantor_id').references('user_id').inTable('core_users').onUpdate('CASCADE').onDelete('CASCADE')
    table.primary(['user_id', 'role_id'])
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('core_user_roles')
}
