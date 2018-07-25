
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_att_threshold', table => {
    table.increments('threshold_id').primary()
    table.specificType('start_early', 'INTERVAL')
    table.specificType('start_late', 'INTERVAL')
    table.specificType('end_early', 'INTERVAL')
    table.specificType('end_late', 'INTERVAL')
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_att_threshold')
};

