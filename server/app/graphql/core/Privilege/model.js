const Model = require('@services/model')

module.exports = class PrivilegeModel extends Model {
  static get tableName() {
    return 'core_privileges'
  }
}