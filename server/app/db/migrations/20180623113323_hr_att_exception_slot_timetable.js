
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_att_exception_slot_timetable', table => {
    table.uuid('exception_slot_id')
    table.uuid('timetable_id')
    
    table.primary(['exception_slot_id', 'timetable_id'])
    table.foreign('timetable_id').references('timetable_id').inTable('hr_att_timetable').onUpdate('CASCADE').onDelete('CASCADE')
    table.foreign('exception_slot_id').references('exception_slot_id').inTable('hr_att_exception_slot').onUpdate('CASCADE').onDelete('CASCADE')
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_att_exception_slot_timetable')
};
