const { Model } = require('objection')

Model.knex(require('@db/knex'))

module.exports = class BaseModel extends Model {

}