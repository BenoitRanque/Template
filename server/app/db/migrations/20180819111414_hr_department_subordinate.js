
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_department_subordinate', table => {
    table.uuid('employee_id')
    table.uuid('department_id')

    table.foreign('employee_id').references('employee_id').inTable('hr_employee').onUpdate('CASCADE').onDelete('CASCADE')
    table.foreign('department_id').references('department_id').inTable('hr_department').onUpdate('CASCADE').onDelete('CASCADE')
    table.primary(['employee_id', 'department_id'])
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_department_subordinate')
}
