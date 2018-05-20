
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('core_resources', table => {
    table.text('resource_id').primary()
    table.text('description')
    table.text('module_id')

    table.foreign('module_id').references('module_id').inTable('core_modules').onUpdate('CASCADE').onDelete('CASCADE')

    table.timestamps()
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('core_resources')
}
