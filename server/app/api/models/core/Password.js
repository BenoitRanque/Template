const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model

module.exports = class CorePassword extends Model {
  static get resourceName () { return 'CorePassword' }
  static get tableName () { return 'core_user_password' }
  static get idColumn () { return 'user_id' }
  static get jsonSchema () { 
    return {
      type: 'object',
      required: ['password'],
      description: 'A User\'s password',
      properties: {
        'user_id': { type: 'string' },
        'password': { type: 'string' }
      }
    }
  }
  static get relationMappings () {
    const User = require('./User')
    return {
      'user': {
        relation: BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'core_users.user_id',
          to: 'core_user_password.user_id'
        }
      }
    }
  }
  async $beforeUpdate(opt, queryContext) {
    const bcrypt = require('bcrypt')
    const { SALT_ROUNDS } = require('@config').bcrypt

    await super.$beforeUpdate(opt, queryContext)
    this.password = await bcrypt.hash(this.password ? this.password : '', SALT_ROUNDS)
  }
  async $beforeInsert(queryContext) {
    const bcrypt = require('bcrypt')
    const { SALT_ROUNDS } = require('@config').bcrypt

    await super.$beforeInsert(queryContext)
    this.password = await bcrypt.hash(this.password ? this.password : '', SALT_ROUNDS)
  }
}