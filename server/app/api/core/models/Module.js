const BaseModel = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = BaseModel

module.exports = class Module extends BaseModel {
  static get tableName() { return 'core_modules' }
  static get idColumn() { return 'module_id' }
  static get name() { return 'Module' }
  static get resource() { return this.name }

  static get jsonSchema () {
    return {
      description: 'A module of the aplication',
      type: 'object',
      properties: {
        module_id: { type: 'string' },
        description: { type: 'string' }
      }
    }
  }
}