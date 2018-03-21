
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('core_privilege_resources', table => {
    table.uuid('privilege_id')
    table.uuid('resource_id')

    table.foreign('privilege_id').references('privilege_id').inTable('core_privileges').onUpdate('CASCADE').onDelete('CASCADE')
    table.foreign('resource_id').references('resource_id').inTable('core_resources').onUpdate('CASCADE').onDelete('CASCADE')
    table.primary(['privilege_id', 'resource_id'])
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('core_privilege_resources')
}
