
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_att_shift', table => {
    table.uuid('shift_id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.text('shift_name')
    table.text('description')
    
    table.timestamps()
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_att_shift')
};
