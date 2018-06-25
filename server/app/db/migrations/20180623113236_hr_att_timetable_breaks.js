
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_att_timetable_breaks', table => {
    table.uuid('timetable_id')
    table.uuid('break_id')

    table.timestamps()

    table.primary(['timetable_id', 'break_id'])
    table.foreign('timetable_id').references('timetable_id').inTable('hr_att_timetable').onUpdate('CASCADE').onDelete('CASCADE')
    table.foreign('break_id').references('break_id').inTable('hr_att_break').onUpdate('CASCADE').onDelete('RESTRICT')
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_att_timetable_breaks')
};

