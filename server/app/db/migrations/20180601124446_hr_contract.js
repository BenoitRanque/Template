
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_contract', table => {
    table.uuid('contract_id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.text('external_contract_id')
    table.timestamp('contract_sign_date')    
    table.timestamp('contract_start_date')
    table.timestamp('contract_end_date')
    table.boolean('contract_verbal')
    table.integer('contract_type')
    table.text('contract_position')
    table.boolean('contract_active')
    table.timestamp('contract_cancel_date')
    table.integer('contract_cancel_motive')

    table.uuid('employee_id')

    table.timestamps()

    table.foreign('employee_id').references('employee_id').inTable('hr_employee').onUpdate('CASCADE').onDelete('CASCADE')
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_contract')
};
