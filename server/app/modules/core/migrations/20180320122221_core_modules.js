
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('core_modules', table => {
    table.string('module_id').primary()
    table.text('description')
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('core_modules')
}
