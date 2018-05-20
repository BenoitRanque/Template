
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('core_user_groups', table => {
    table.uuid('user_id')
    table.uuid('group_id')

    table.foreign('user_id').references('user_id').inTable('core_users').onUpdate('CASCADE').onDelete('CASCADE')
    table.foreign('group_id').references('group_id').inTable('core_groups').onUpdate('CASCADE').onDelete('CASCADE')
    table.primary(['user_id', 'group_id'])
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('core_user_groups')
}
