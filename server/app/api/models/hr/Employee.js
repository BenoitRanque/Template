const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class HREmployee extends Model {
  static get tableName () { return 'hr_employee' }
  static get idColumn () { return 'employee_id' }
  static get relationMappings () {
    // const EmployeeData = require('./EmployeeData')
    // const EmployeeData2 = require('./EmployeeData2')
    // const IdentificationDocument = require('./IdentificationDocument')
    const Contact = require('./Contact')
    const Contract = require('./Contract')

    return {
      // 'data': {        
      //   relation: HasOneRelation,
      //   modelClass: EmployeeData,
      //   join: {
      //     from: 'hr_employee.employee_id',
      //     to: 'hr_employee_data.employee_id'
      //   }
      // },
      // 'data2': {        
      //   relation: HasOneRelation,
      //   modelClass: EmployeeData2,
      //   join: {
      //     from: 'hr_employee.employee_id',
      //     to: 'hr_employee_data2.employee_id'
      //   }
      // },
      // 'identification_document': {        
      //   relation: HasManyRelation,
      //   modelClass: IdentificationDocument,
      //   join: {
      //     from: 'hr_employee.employee_id',
      //     to: 'hr_identification_document.employee_id'
      //   }
      // },
      'contact': {        
        relation: HasManyRelation,
        modelClass: Contact,
        join: {
          from: 'hr_employee.employee_id',
          to: 'hr_contact.employee_id'
        }
      },
      'contract': {        
        relation: HasManyRelation,
        modelClass: Contract,
        join: {
          from: 'hr_employee.employee_id',
          to: 'hr_contract.employee_id'
        }
      }
    }
  }
}
