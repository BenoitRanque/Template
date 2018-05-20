
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('core_privileges', table => {
    table.uuid('privilege_id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.text('resource_id').notNullable()
    table.text('action').notNullable()
    table.text('possession').notNullable()
    table.specificType('attributes', 'TEXT[]')
    table.text('privilege_name').notNullable()
    table.text('description')

    table.foreign('resource_id').references('resource_id').inTable('core_resources').onUpdate('CASCADE').onDelete('CASCADE')

    table.timestamps()
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('core_privileges')
}
