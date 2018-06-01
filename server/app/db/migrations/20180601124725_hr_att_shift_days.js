
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_att_shift_days', table => {
    table.uuid('shift_id')
    table.uuid('day_id')
    table.integer('index')

    table.timestamps()

    table.primary(['shift_id', 'day_id', 'index'])
    table.foreign('shift_id').references('shift_id').inTable('hr_att_shift').onUpdate('CASCADE').onDelete('CASCADE')
    table.foreign('day_id').references('day_id').inTable('hr_att_day').onUpdate('CASCADE').onDelete('CASCADE')
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_att_shift_days')
};
