
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('core_role_extend', table => {
    table.uuid('extended_role_id')
    table.uuid('base_role_id')

    table.foreign('extended_role_id').references('role_id').inTable('core_roles').onUpdate('CASCADE').onDelete('CASCADE')
    table.foreign('base_role_id').references('role_id').inTable('core_roles').onUpdate('CASCADE').onDelete('RESTRICT')
    table.primary(['extended_role_id', 'base_role_id'])
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('core_role_extend')
}
