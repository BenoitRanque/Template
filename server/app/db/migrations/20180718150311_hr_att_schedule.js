exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_att_schedule', table => {
    table.uuid('schedule_id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.text('schedule_name')
    table.text('description')
    table.boolean('standard').defaultTo(false)
    
    table.timestamps()
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_att_schedule')
};
