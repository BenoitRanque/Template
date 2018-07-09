
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_att_timetable', table => {
    table.uuid('timetable_id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.uuid('schedule_id')
    table.integer('type_id').notNullable()
    table.text('timetable_name')
    table.specificType('duration', 'INTERVAL')
    table.time('start_time')
    // table.specificType('start_time', 'TIME(6) WITH TIME ZONE')
    table.boolean('start_require_event')
    table.time('end_time')
    // table.specificType('end_time', 'TIME(6) WITH TIME ZONE')
    table.boolean('end_require_event')

    table.timestamps()

    table.foreign('schedule_id').references('schedule_id').inTable('hr_att_schedule').onUpdate('CASCADE').onDelete('CASCADE')
    table.foreign('type_id').references('type_id').inTable('hr_att_type').onUpdate('CASCADE').onDelete('RESTRICT')
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_att_timetable')
};

