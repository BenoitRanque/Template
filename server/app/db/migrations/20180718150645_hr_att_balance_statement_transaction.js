
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_att_balance_statement_transaction', table => {
    table.uuid('balance_statement_id')
    table.uuid('transaction_id')

    table.foreign('balance_statement_id').references('balance_statement_id').inTable('hr_att_balance_statement').onUpdate('CASCADE').onDelete('RESTRICT')
    table.foreign('transaction_id').references('transaction_id').inTable('hr_att_transaction').onUpdate('CASCADE').onDelete('CASCADE')
    table.primary(['balance_statement_id', 'transaction_id'])
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_att_balance_statement_transaction')
}
