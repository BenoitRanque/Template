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
     * example filter
     * 
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

class BaseModel extends Model {
  static get QueryBuilder() {
    return BaseQueryBuilder
  }

}

module.exports = function (config) {

  const {
    tableName,
    idColumn,
    name,
    description,
    filters,
    schema,
    relations,
  } = config

  // todo: validate model
  
  return {
    [name]: class extends BaseModel {
      static get tableName() { return tableName }
      static get idColumn() { return idColumn }
      static get description() { return description }
      static get resource() { return resource }
      static get jsonSchema () {
        return {
          name,
          description,
          ...schema
        }
      }
      static get relationMappings () {
        return relations()
      }
      static get queryFilters() { return filters }
    }
  }[name]
}
