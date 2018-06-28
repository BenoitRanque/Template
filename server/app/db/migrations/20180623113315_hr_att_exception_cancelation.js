
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_att_exception_cancelation', table => {
    table.uuid('exception_id').primary()
    table.uuid('user_id')

    table.timestamps()

    table.foreign('user_id').references('user_id').inTable('core_users').onUpdate('CASCADE').onDelete('RESTRICT')
    table.foreign('exception_id').references('exception_id').inTable('hr_att_exception').onUpdate('CASCADE').onDelete('RESTRICT')
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_att_exception_cancelation')
};


