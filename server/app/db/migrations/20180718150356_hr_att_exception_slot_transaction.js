
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_att_exception_slot_transaction', table => {
    table.uuid('exception_slot_id')
    table.uuid('transaction_id')

    table.foreign('exception_slot_id').references('exception_slot_id').inTable('hr_att_exception_slot').onUpdate('CASCADE').onDelete('RESTRICT')
    table.foreign('transaction_id').references('transaction_id').inTable('hr_att_transaction').onUpdate('CASCADE').onDelete('CASCADE')
    table.primary(['exception_slot_id', 'transaction_id'])
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_att_exception_slot_transaction')
}
