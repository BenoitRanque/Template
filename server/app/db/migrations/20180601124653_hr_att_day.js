

exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_att_day', table => {
    table.uuid('day_id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))

    table.text('day_name')

    table.timestamps()
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_att_day')
};
