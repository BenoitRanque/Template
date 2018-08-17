
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_subordinate_employee', table => {
    table.uuid('user_id')
    table.uuid('employee_id')

    table.foreign('user_id').references('user_id').inTable('core_users').onUpdate('CASCADE').onDelete('CASCADEL')
    table.foreign('employee_id').references('employee_id').inTable('hr_employee').onUpdate('CASCADE').onDelete('CASCADE')
    table.primary(['user_id', 'employee_id'])
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_subordinate_employee')
}
