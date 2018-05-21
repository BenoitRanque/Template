
exports.seed = async function(knex, Promise) {
  const Employee = require('@models/hr/Employee')

  // Deletes ALL existing entries
  await Employee.query().delete()

  await Employee.query().insert({
    internal_id: 'SIS002',
    firstname: 'Benoit',
    lastname: 'Ranque',
    date_of_birth: '1996-01-09T04:00:00.000Z',
    sex: 'M',
    identification_document: [
      {
        name: 'carnet',
        value: '13513808'
      }
    ],
    contact: [
      {
        name: 'telefono',
        value: '+591 77 668 012'
      },
      {
        name: 'email',
        value: 'ranque.benoit@gmail.com'
      }
    ],
    address: [
      {
        name: '',
        value: ''
      }
    ]
  })
}
