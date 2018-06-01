
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_att_break', table => {
    table.uuid('break_id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.text('break_name')
    table.text('description')
    table.timestamp('start')
    table.timestamp('end')
    table.timestamp('duration')
    table.timestamps()
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_att_break')
};

