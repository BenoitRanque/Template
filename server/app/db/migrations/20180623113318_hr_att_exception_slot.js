
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_att_exception_slot', table => {
    table.uuid('exception_slot_id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.uuid('exception_id')
    table.timestamp('date')
    
    table.timestamps()

    table.foreign('exception_id').references('exception_id').inTable('hr_att_exception').onUpdate('CASCADE').onDelete('CASCADE')
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_att_exception_slot')
};
