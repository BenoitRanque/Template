const { Model, QueryBuilder } = require('objection')
const { modelToGraphQLFilterType, modelToGraphQLInputType, modelToGraphQLType } = require('./modelToGraphQL')
const { buildEager } = require('./buildEager')

Model.knex(require('@db/knex'))

module.exports = class BaseModel extends Model {

  static get GraphQLType () {
    return modelToGraphQLType(this)
  }
  
  static get GraphQLFilterType () {
    if (!this.filters) throw new Error(`No filter has been specified on model ${this.name}`)
    return modelToGraphQLFilterType(this)
  }
  
  static get GraphQLInputType () {
    return modelToGraphQLInputType(this)
  }

  static get QueryBuilder () {
    return class BaseQueryBuilder extends QueryBuilder {
      autoEager (info) {
        let { expression, filters } = buildEager(this._modelClass, info)
        return this.eager(expression, filters)
      }
      autoFilter (filter) {
        if (filter) {
          Object.keys(filter).forEach(filterName => {
            if (this._modelClass.filters[filterName] === undefined || this.modelClass.filters[filterName].method === undefined ) throw new Error(`Could not find filter ${filterName} in model ${model.name}`)
            this = this._modelClass.filters[filterName].method(this, filter[filterName])
          })
        }
        return this
      }
    }
  }
}
