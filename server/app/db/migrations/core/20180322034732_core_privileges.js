
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('core_privileges', table => {
    table.uuid('privilege_id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.text('module_id').notNullable()
    table.text('resource').notNullable()
    table.text('action').notNullable()
    table.text('possession').notNullable()
    table.specificType('attributes', 'TEXT[]')
    table.text('privilege_name').notNullable()
    table.text('description')

    table.unique(['module_id', 'resource', 'action', 'possession']) // unique combination
    table.foreign('module_id').references('module_id').inTable('core_modules').onUpdate('CASCADE').onDelete('CASCADE')
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('core_privileges')
}
