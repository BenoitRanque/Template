
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('core_role_privileges', table => {
    table.uuid('role_id')
    table.uuid('privilege_id')

    table.foreign('privilege_id').references('privilege_id').inTable('core_privileges').onUpdate('CASCADE').onDelete('CASCADE')
    table.foreign('role_id').references('role_id').inTable('core_roles').onUpdate('CASCADE').onDelete('CASCADE')
    table.primary(['role_id', 'privilege_id'])
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('core_role_privileges')
}

