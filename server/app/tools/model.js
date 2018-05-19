const { Model, QueryBuilder } = require('objection')
const buildEager = require('./buildEager')

Model.knex(require('@db/knex'))

class BaseQueryBuilder extends QueryBuilder {

  belongsTo(user_id) {
    if (!user_id) throw new Error(`user_id is a required paramter of the belongsTo function`)
    let own = this.modelClass.queryFilters.own
    if (!own) throw new Error(`model ${this._modelClass.name} does not have a own filter`)
    own(this, user_id)
    return this
  }

  applyFilters(filters) {
    /*
     * example filters
     * 
     * first: (query, value) => query.limit(value),
     * after: (query, value) => query.offset(value)
     * user_id: (query, user_id) => query.where({ user_id })
     * 
     */
    if (!filters) return this
    Object.keys(filters).forEach(filterName => {
      let filterFunction = this._modelClass.queryFilters[filterName]
      if (!filterFunction) throw new Error(`Unknown filter ${filterName} in model ${this.modelClass.name}`)
      filterFunction(this, filters[filterName])
    })
    return this
  }

  eagerFromFields(fields, owner) {
    
    if (!fields) return this
    let model = this._modelClass

    const [expression, filters] = buildEager(model, fields, owner)

    return this.eager(expression, filters)
  }
}

module.exports = class BaseModel extends Model {
  static get QueryBuilder() {
    return BaseQueryBuilder
  }

  // timestamps on all models
  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}

// module.exports = function (config) {
//   const {
//     jsonAttributes,
//     tableName,
//     idColumn,
//     name,
//     resource,
//     description,
//     filters,
//     schema,
//     relations
//   } = config

//   if (!resource) throw new Error(`No resource specified for model ${name}`)
//   // todo: validate model

//   return {
//     [name]: class extends BaseModel {
//       static get jsonAttributes() { return jsonAttributes }
//       static get tableName() { return tableName }
//       static get idColumn() { return idColumn }
//       static get description() { return description }
//       static get resource() { return resource }
//       static get jsonSchema () {
//         return {
//           name,
//           description,
//           ...schema
//         }
//       }
//       static get relationMappings () {
//         return relations ? relations() : {}
//       }
//       static get queryFilters() { return { ...filters } }
//     }
//   }[name]
// }
