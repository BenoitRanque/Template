
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('core_resources', table => {
    table.uuid('resource_id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.string('module')
    table.text('path').notNullable()
    table.enu('method', ['get', 'post', 'put', 'delete'])
    table.text('description')

    table.foreign('module').references('module_id').inTable('core_modules').onUpdate('CASCADE').onDelete('CASCADE')
    table.unique(['path', 'method']) // unique combination
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('core_resources')
}

