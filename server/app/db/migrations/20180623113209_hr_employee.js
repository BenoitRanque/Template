
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_employee', table => {
    table.uuid('employee_id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))

    table.text('name_first')
    table.text('name_middle')
    table.text('name_paternal')
    table.text('name_maternal')
    table.text('name_married')
    table.enu('sex', ['M', 'F', null])
    table.timestamp('date_of_birth')
    table.text('place_of_birth')
    table.text('nationality')
    table.text('marital_status')

    table.text('jubilado')
    table.text('aporta_afp')
    table.text('persona_con_discapacidad')
    table.text('tutor_persona_con_discapacidad')
    table.text('caja_de_salud')
    table.text('afp')
    table.text('nua_cua')
    
    table.text('document_type')
    table.text('document_number')
    table.text('document_extension')
    table.text('document_emitted')
    
    table.integer('zktime_pin')

    table.timestamps()

  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_employee')
};
