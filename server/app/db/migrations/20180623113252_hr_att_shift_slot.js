
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_att_shift_slot', table => {
    table.uuid('shift_slot_id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.uuid('shift_id')
    table.number('index')
    
    table.timestamps()

    table.foreign('shift_id').references('shift_id').inTable('hr_att_shift').onUpdate('CASCADE').onDelete('CASCADE')
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_att_shift_slot')
};
