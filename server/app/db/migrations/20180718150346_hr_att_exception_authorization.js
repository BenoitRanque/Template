
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_att_exception_authorization', table => {
    table.uuid('authorization_id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.uuid('exception_id')
    table.uuid('user_id')
    table.boolean('granted')

    table.timestamps()

    table.foreign('exception_id').references('exception_id').inTable('hr_att_exception').onUpdate('CASCADE').onDelete('RESTRICT')
    table.foreign('user_id').references('user_id').inTable('core_users').onUpdate('CASCADE').onDelete('RESTRICT')
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_att_exception_authorization')
};
