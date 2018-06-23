
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_att_shift_assign', table => {
    table.uuid('shift_assign_id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.uuid('shift_id')
    table.uuid('employee_id')
    table.uuid('user_id')
    table.integer('shift_start_index')
    table.timestamp('start_date')
    table.timestamp('end_date')
    
    table.timestamps()

    table.foreign('shift_id').references('shift_id').inTable('hr_att_shift').onUpdate('CASCADE').onDelete('CASCADE')
    table.foreign('employee_id').references('employee_id').inTable('hr_employee').onUpdate('CASCADE').onDelete('CASCADE')
    table.foreign('user_id').references('user_id').inTable('core_users').onUpdate('CASCADE').onDelete('SET NULL')
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_att_shift_assign')
};

