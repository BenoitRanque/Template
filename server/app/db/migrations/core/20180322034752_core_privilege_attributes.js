
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('core_privilege_attributes', table => {
    table.uuid('privilege_id')
    table.text('attribute')

    table.foreign('privilege_id').references('privilege_id').inTable('core_privileges').onUpdate('CASCADE').onDelete('CASCADE')
    table.primary(['privilege_id', 'attribute'])
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('core_privilege_attributes')
}
