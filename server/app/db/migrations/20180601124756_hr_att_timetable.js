
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_att_timetable', table => {
    table.uuid('timetable_id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.text('timetable_name')
    table.text('description')
    table.timestamp('in_time')
    table.timestamp('in_start')
    table.timestamp('in_end')
    table.timestamp('out_time')
    table.timestamp('out_start')
    table.timestamp('out_end')
    
    table.timestamps()
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_att_timetable')
};

