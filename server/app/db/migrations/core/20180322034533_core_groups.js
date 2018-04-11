
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('core_groups', table => {
    table.uuid('group_id').unique().notNullable().primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.text('group_name').unique().notNullable()
    table.uuid('group_owner_id')
    table.text('description')

    table.foreign('group_owner_id').references('user_id').inTable('core_users').onUpdate('CASCADE').onDelete('CASCADE')
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('core_groups')
}

