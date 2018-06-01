
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_att_day_timetables', table => {
    table.uuid('day_id')
    table.uuid('timetable_id')

    table.timestamps()

    table.primary(['timetable_id', 'day_id'])
    table.foreign('day_id').references('day_id').inTable('hr_att_day').onUpdate('CASCADE').onDelete('CASCADE')
    table.foreign('timetable_id').references('timetable_id').inTable('hr_att_timetable').onUpdate('CASCADE').onDelete('CASCADE')
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_att_day_timetables')
};
