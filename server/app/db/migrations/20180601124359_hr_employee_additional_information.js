
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_employee_additional_information', table => {
    table.uuid('employee_id').primary()
    table.text('jubilado')
    table.text('aporta_afp')
    table.text('persona_con_descapacidad')
    table.text('tutor_persona_con_descapacidad')
    table.text('caja_de_salud')
    table.text('afp_aporte')
    table.text('nua_cua')
    table.text('sucursal')
    table.text('clasificacion_laboral')

    table.timestamps()

    table.foreign('employee_id').references('employee_id').inTable('hr_employee').onUpdate('CASCADE').onDelete('CASCADE')

  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_employee_additional_information')
};

