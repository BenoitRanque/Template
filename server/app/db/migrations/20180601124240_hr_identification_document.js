
exports.up = async function(knex, Promise) {
  await knex.schema.withSchema('public').createTable('hr_identification_document', table => {
    table.uuid('document_id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.text('document_type')
    table.text('document_number')
    table.text('document_extension')
    table.uuid('employee_id')

    table.timestamps()

    table.foreign('employee_id').references('employee_id').inTable('hr_employee').onUpdate('CASCADE').onDelete('CASCADE')
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('hr_identification_document')
};
