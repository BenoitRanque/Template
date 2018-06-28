
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_att_timetable', table => {
    table.uuid('timetable_id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.uuid('schedule_id')
    table.integer('type_id').notNullable()
    table.timestamp('start_time')
    table.boolean('start_register')
    table.timestamp('end_time')
    table.boolean('end_register')
    table.integer('duration')
    table.boolean('flexible')

    table.timestamps()

    table.foreign('schedule_id').references('schedule_id').inTable('hr_att_schedule').onUpdate('CASCADE').onDelete('RESTRICT')
    table.foreign('type_id').references('type_id').inTable('hr_att_type').onUpdate('CASCADE').onDelete('RESTRICT')
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_att_timetable')
};

