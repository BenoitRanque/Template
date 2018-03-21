
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('core_privileges', table => {
    table.uuid('privilege_id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.string('module').notNullable()
    table.string('name').notNullable()
    table.text('description')

    table.unique(['module', 'name']) // unique combination
    table.foreign('module').references('module_id').inTable('core_modules').onUpdate('CASCADE').onDelete('CASCADE')
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('core_privileges')
}
