// GraphQL AST node types.
const KIND_FRAGMENT_SPREAD = 'FragmentSpread';
const KIND_VARIABLE = 'Variable';

function eager (model, info) { 
  return buildEager(model, info.fieldNodes[0], info)
}

function buildEager(model, astNode, astRoot) {
  const eagerExpr = buildEagerSegment(model, astNode, astRoot);

  if (eagerExpr.expression.length) {
    eagerExpr.expression = `[${eagerExpr.expression}]`;
  }

  return eagerExpr;
}

function buildEagerSegment(model, astNode, astRoot) {
  const filters = {};
  const relations = model.getRelations();
  let expression = '';

  astNode.selectionSet.selections.forEach(selectionNode => {
    let relation = relations[selectionNode.name.value]

    if (relation) {
      expression = buildEagerRelationSegment(selectionNode, relation, expression, filters, astRoot);
    } else if (selectionNode.kind === KIND_FRAGMENT_SPREAD) {
      expression = buildEagerFragmentSegment(selectionNode, model, expression, filters, astRoot);
    }
  })

  return {
    expression,
    filters
  }
}

function buildEagerRelationSegment(selectionNode, relation, expression, filters, astRoot) {
  let relExpr = selectionNode.name.value;

  // const selectFilter = filterForSelects(selectionNode, relation.relatedModelClass, astRoot);
  // const filterNames = [];

  // if (selectFilter) {
  //   this.filterIndex += 1;
  //   const filterName = `s${this.filterIndex}`;

  //   filterNames.push(filterName);
  //   filters[filterName] = selectFilter;
  // }

  // if (selectionNode.arguments.length) {
  //   const argFilter = filterForArgs(selectionNode, relation.relatedModelClass, astRoot.variableValues);

  //   if (argFilter) {
  //     this.filterIndex += 1;
  //     const filterName = `f${this.filterIndex}`;

  //     filterNames.push(filterName);
  //     filters[filterName] = argFilter;
  //   }
  // }

  if (filterNames.length) {
    relExpr += `(${filterNames.join(', ')})`;
  }

  const subExpr = buildEager(selectionNode, relation.relatedModelClass, astRoot);

  if (subExpr.expression.length) {
    relExpr += `.${subExpr.expression}`;
    Object.assign(filters, subExpr.filters);
  }

  if (expression.length) {
    expression += ', ';
  }

  return expression + relExpr;
}