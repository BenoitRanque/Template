
function buildEager(model, info) {
  let FILTER_INDEX = 0

  return buildEagerSegment(model, info.fieldNodes[0], info)

  function buildEagerSegment(model, astNode, astRoot) {
    const filters = {};
    const relations = model.getRelations();
    let expression = '';

    astNode.selectionSet.selections.forEach(selectionNode => {
      let relation = relations[selectionNode.name.value]
      if (relation) {
        expression = buildEagerRelationSegment(selectionNode, relation.relatedModelClass, expression, filters, astRoot)
      }
    })

    if (expression.length) expression = `[${expression}]`

    return {
      expression,
      filters
    }
  }

  function buildEagerRelationSegment(selectionNode, relation, expression, filters, astRoot) {
    let relExpr = selectionNode.name.value;

    const filterNames = [];

    if (selectionNode.arguments) {
      let filterArgument = selectionNode.arguments.find(arg => arg.name.value === 'filter')
      if (filterArgument) {
        filterArgument.value.fields.forEach(filterField => {
          if (relation.filters[filterName] === undefined || relation.filters[filterName].method === undefined ) throw new Error(`Could not find filter ${filterField.name.value} in model ${relation.relatedModelClass.name}`)

          let filterFunc = relation.filters[filterField.name.value].method
          let filterName = `filter_${FILTER_INDEX}_${filterField.name.value}`
          FILTER_INDEX += 1
          filterNames.push(filterName)

          filters[filterName] = query => filterFunc(query, filterField.value.value)
        })
      }
    }

    if (filterNames.length) {
      relExpr += `(${filterNames.join(', ')})`;
    }

    const subExpr = buildEagerSegment(relation, selectionNode, astRoot);

    if (subExpr.expression.length) {
      relExpr += `.${subExpr.expression}`;
      Object.assign(filters, subExpr.filters);
    }

    if (expression.length) {
      expression += ', ';
    }

    return expression + relExpr;
  }
}

module.exports = {
  buildEager
}
