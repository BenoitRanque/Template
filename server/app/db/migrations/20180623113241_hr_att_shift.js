
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_att_shift', table => {
    table.uuid('shift_id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.text('shift_name')
    table.text('description')

    table.uuid('employee_id')
    table.uuid('user_id')

    table.date('start_date')
    table.date('end_date')
    
    table.timestamps()

    table.foreign('employee_id').references('employee_id').inTable('hr_employee').onUpdate('CASCADE').onDelete('RESTRICT')
    table.foreign('user_id').references('user_id').inTable('core_users').onUpdate('CASCADE').onDelete('RESTRICT')
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_att_shift')
};
