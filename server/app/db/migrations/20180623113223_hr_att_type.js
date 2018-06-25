
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_att_type', table => {
    table.uuid('type_id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.text('type_name')
    table.text('description')
    table.text('code').unique().notNullable()
    table.text('color')
    
    table.timestamps()
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_att_type')
};

