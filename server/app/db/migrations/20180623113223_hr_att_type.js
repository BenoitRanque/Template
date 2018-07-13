
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_att_type', table => {
    table.integer('type_id').primary()
    table.text('type_name')
    table.text('description')
    table.text('code').unique().notNullable()
    table.text('color')
    table.time('start_early_threshold')
    table.time('start_late_threshold')
    table.time('end_early_threshold')
    table.time('end_late_threshold')
    
    table.timestamps()
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_att_type')
};

