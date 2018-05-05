const { Model, QueryBuilder } = require('objection')

Model.knex(require('@db/knex'))

class BaseQueryBuilder extends QueryBuilder {
  eagerFromGraph(graph, model) {
    // build eager expression
    // apply first level filters

    const [expression, filters] = buildEager(graph.fields(), graph, model)

    return this.eager(expression, filters)
  }

  allowInsertFromGraph(graph, model) {

  }

  allowUpsertFromGraph(graph, model) {

  }
}

class BaseModel extends Model {
  static get QueryBuilder() {
    return BaseQueryBuilder
  }

}

function buildEager (fields, graph, model) {
  let FILTER_INDEX = 0
  const EAGERFILTERS = {}

  return [expression, filters]

  function buildEagerFields(fields, parentModel) {
    let stringFields = []
    let relations = parentModel.getRelations()

    fields.forEach(field => {
      let relation = relations[fieldName]
      // if relation does not exist, ignore
      // todo: separate natural fields and model relations in graph class
      if (!relation) return
      let fieldName = graph.root(field)
      let filters = buildEagerFilters(graph.filters(field), relation.relatedModelClass)
      let subFields = buildEagerFields(graph.fields(field), relation.relatedModelClass)
      stringFields.push(`${fieldName}${filters}${subFields.length?'.'+ subFields : ''}`)
    })

    return stringFields.length ? `[${stringFields.join(', ')}]` : ''
  }
 
  function buildEagerFilters (filters, model) {
    let stringFilters = []
    Object.keys(filters).forEach(filterName => {
      let filterValue = filter[filterName]
      let filterFunction = model.filters[filterName]
      let filterKey = `f${FILTER_INDEX}_${model.name}_${filterName}_${filterValue}`
      FILTER_INDEX += 1
      // todo: use some default filters accross multiple models
      if (!filterFunction) throw new Error(`Unknown filter ${filterName} on model ${model.name}`)
      EAGERFILTERS[filterKey] = query => filterFunction(query, filterValue)
      stringFilters.push(filterKey)
    })
    return stringFilters.length ? `(${stringFilters.join(', ')})` : ''
  }
}

module.exports = BaseModel
