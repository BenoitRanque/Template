
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_employee_information', table => {
    table.uuid('employee_id').primary()
    table.text('name_first')
    table.text('name_middle')
    table.text('name_married')
    table.text('name_paternal')
    table.text('name_maternal')
    table.text('nationality')
    table.text('place_of_birth')
    table.timestamp('date_of_birth')
    table.enu('sex', ['M', 'F', null])
    table.text('marital_status')

    table.timestamps()

    table.foreign('employee_id').references('employee_id').inTable('hr_employee').onUpdate('CASCADE').onDelete('CASCADE')
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_employee_information')
};
