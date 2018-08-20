
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_department_supervisor', table => {
    table.uuid('user_id')
    table.uuid('department_id')

    table.foreign('user_id').references('user_id').inTable('core_users').onUpdate('CASCADE').onDelete('CASCADE')
    table.foreign('department_id').references('department_id').inTable('hr_department').onUpdate('CASCADE').onDelete('CASCADE')
    table.primary(['user_id', 'department_id'])
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_department_supervisor')
}
