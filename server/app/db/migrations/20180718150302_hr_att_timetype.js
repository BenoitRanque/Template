
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_att_timetype', table => {
    table.increments('timetype_id').primary()
    table.text('timetype_name')
    table.text('description')
    table.enum('category', ['BREAKTIME', 'UPTIME', 'DOWNTIME'])
    table.boolean('additional') // whhether this type of time will count towards the standard day value, false on extra hours
    table.boolean('accountable') // whether this type of time will go to account on changes
    table.boolean('paid') // whether this type of time is paid
    table.boolean('vacation') // whether this type of time is vacation
    table.text('code')
    table.text('color')
   
    table.timestamps()
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_att_timetype')
};

