module.exports = function buildEager(model, fields, owner) {
  let FILTER_INDEX = 0
  const EAGERFILTERS = {}
  const relations = model.getRelations()

  const expression = buildEagerFields(fields, relations)
  
  return [expression, EAGERFILTERS]

  function buildEagerFields (fields, relations) {
    let expression = fields.map(field => {
      if (typeof field === 'string') return field
      if (field.length === 1) return field[0]

      let fieldName = field[0]
      let relation = relations[fieldName]
      if (!relation) throw new Error(`could not find relation ${fieldName}`)
      let model = relation.relatedModelClass

      let subFields = []
      let filters = []

      if (owner && model.queryFilters['own']) {
        filters.push(buildEagerFilter('own', owner, model))
      }
      
      field.slice(1).forEach(item => {
        if (typeof item === 'string' || Array.isArray(item)) {
          subFields.push(item)
        }
        else if (typeof item === 'object') {
          Object.keys(item).forEach(filter => {
            filters.push(buildEagerFilter(filter, item[filter], model))
          })
        }
        else {
          throw new Error(`Invalid field value ${item}`)
        }
      })
      
      if (subFields.length) {
        let relations = model.getRelations()
        subFields = buildEagerFields(subFields, relations)
      }


      return [
        fieldName,
        filters.length ? `(${filters.join(', ')})` : '',
        subFields.length ? `.${subFields}` : ''
      ].join('')
    })
    return expression.length ? `[${expression.join(', ')}]` : ''
  }

  function buildEagerFilter (filterName, filterValue, model) {
    let filterKey = `f${FILTER_INDEX}_${model.name}_${filterName}_${filterValue}`
    let filterFunction = model.queryFilters[filterName]
    if (!filterFunction) throw new Error(`could not find filter ${filterName} on model ${model.name}`)
    EAGERFILTERS[filterKey] = query => filterFunction(query, filterValue)
    FILTER_INDEX += 1
    return filterKey
  }
}
