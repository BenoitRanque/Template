const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class HREmployee extends Model {
  static get resourceName () { return 'HREmployee' }
  static get tableName () { return 'hr_employees' }
  static get idColumn () { return 'employee_id' }
  static get jsonSchema () { 
    return {
      type: 'object',
      description: 'An employee',
      properties: {
        'employee_id': { type: 'string' },
        'internal_id': { type: 'string' },
        'firstname': { type: 'string' },
        'lastname': { type: 'string' },
        'date_of_birth': { type: 'string' },
        'sex': { type: 'string', enum: ['F', 'M'] },
        'identifcation_document': { type: 'string' },
        'contact': {
          type: 'array',
          items: { 
            type: 'object',
            properties: {
              'name': { type: 'string' },
              'data': { type: 'string' }
            }
          }
        },
        'address': {
          type: 'array',
          items: { 
            type: 'object',
            properties: {
              'name': { type: 'string' },
              'data': { type: 'string' }
            }
          }
        },
        'user_id': { type: ['string', 'null'] }
      }
    }
  }
  static get relationMappings () {
    const User = require('../core/User')
    return {
      'user': {
        relation: HasOneRelation,
        modelClass: User,
        join: {
          from: 'hr_employees.user_id',
          to: 'core_users.user_id'
        }
      }
    }
  }
}
