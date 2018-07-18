
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_att_transaction', table => {
    table.integer('transaction_id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.integer('account')
    table.text('type')
    table.decimal('amount', 15, 12)
    
    table.timestamps()
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_att_transaction')
};

