
exports.up = async function(knex, Promise) {
  // await knex.schema.withSchema('public').createTable('hr_employee_data', table => {
  //   table.uuid('employee_id').primary()
  //   table.text('name_first')
  //   table.text('name_middle')
  //   table.text('name_paternal')
  //   table.text('name_maternal')
  //   table.text('name_married')
  //   table.enu('sex', ['M', 'F', null])
  //   table.timestamp('date_of_birth')
  //   table.text('place_of_birth')
  //   table.text('nationality')
  //   table.text('marital_status')

  //   table.timestamps()

  //   table.foreign('employee_id').references('employee_id').inTable('hr_employee').onUpdate('CASCADE').onDelete('CASCADE')
  // })
};

exports.down = async function(knex, Promise) {
  // await knex.schema.withSchema('public').dropTable('hr_employee_data')
};
