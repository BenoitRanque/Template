
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('core_modules', table => {
    table.text('module_id').primary()
    table.text('description')

    table.timestamps()
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('core_modules')
}
