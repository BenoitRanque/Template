
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_att_transaction', table => {
    table.uuid('transaction_id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.text('transaction_name')
    table.text('description')
    table.uuid('employee_id').notNullable()
    table.integer('account')
    table.text('type')
    table.decimal('amount', 15, 12)
    table.uuid('user_id')
    table.uuid('exception_id')
    
    table.timestamps()
    
    table.foreign('user_id').references('user_id').inTable('core_users').onUpdate('CASCADE').onDelete('RESTRICT')
    table.foreign('employee_id').references('employee_id').inTable('hr_employee').onUpdate('CASCADE').onDelete('RESTRICT')
    table.foreign('exception_id').references('exception_id').inTable('hr_att_exception').onUpdate('CASCADE').onDelete('RESTRICT')
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_att_transaction')
};

