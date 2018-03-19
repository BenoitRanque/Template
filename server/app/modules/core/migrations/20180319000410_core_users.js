
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('core_users', table => {
    table.uuid('id').unique().defaultTo(knex.raw('public.gen_random_uuid()'))
    // table.dateTime('createdAt').notNull();
    // table.dateTime('updatedAt').nullable();
    // table.dateTime('deletedAt').nullable();

    table.string('name').notNullable()
    table.text('decription').nullable()
    // table.decimal('price', 6, 2).notNull();
    // table.enum('category', ['apparel', 'electronics', 'furniture']).notNull();
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('core_users')
}
