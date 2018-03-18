module.exports = function (knex) {
  knex.schema.withSchema('public').createTable('core_users', table => {
      table.uuid('id').unique().defaultTo(knex.schema.raw("gen_random_uuid()"))
    }).then(response => {
      console.log('table created')
      console.log(response)
    })
}