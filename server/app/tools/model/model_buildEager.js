// GraphQL AST node types.
const KIND_FRAGMENT_SPREAD = 'FragmentSpread';
const KIND_VARIABLE = 'Variable';

function buildEager(astNode, modelClass, astRoot) {
  const eagerExpr = buildEagerSegment(astNode, modelClass, astRoot);

  if (eagerExpr.expression.length) {
    eagerExpr.expression = `[${eagerExpr.expression}]`;
  }

  return eagerExpr;
}

function buildEagerSegment(astNode, modelClass, astRoot) {
  const filters = {};
  const relations = modelClass.getRelations();
  let expression = '';

  for (let i = 0, l = astNode.selectionSet.selections.length; i < l; i += 1) {
    const selectionNode = astNode.selectionSet.selections[i];
    const relation = relations[selectionNode.name.value];

    if (relation) {
      expression = buildEagerRelationSegment(selectionNode, relation, expression, filters, astRoot);
    } else if (selectionNode.kind === KIND_FRAGMENT_SPREAD) {
      expression = buildEagerFragmentSegment(selectionNode, modelClass, expression, filters, astRoot);
    }
  }

  return {
    expression,
    filters,
  };
}

function buildEagerRelationSegment(selectionNode, relation, expression, filters, astRoot) {
  let relExpr = selectionNode.name.value;

  const selectFilter = filterForSelects(selectionNode, relation.relatedModelClass, astRoot);
  const filterNames = [];

  if (selectFilter) {
    this.filterIndex += 1;
    const filterName = `s${this.filterIndex}`;

    filterNames.push(filterName);
    filters[filterName] = selectFilter;
  }

  if (selectionNode.arguments.length) {
    const argFilter = filterForArgs(selectionNode, relation.relatedModelClass, astRoot.variableValues);

    if (argFilter) {
      this.filterIndex += 1;
      const filterName = `f${this.filterIndex}`;

      filterNames.push(filterName);
      filters[filterName] = argFilter;
    }
  }

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

function buildEagerFragmentSegment(selectionNode, modelClass, expression, filters, astRoot) {
  const fragmentSelection = astRoot.fragments[selectionNode.name.value];
  const fragmentExpr = buildEagerSegment(fragmentSelection, modelClass, astRoot);
  let fragmentExprString = '';

  if (fragmentExpr.expression.length) {
    fragmentExprString += fragmentExpr.expression;
    Object.assign(filters, fragmentExpr.filters);
  }

  if (expression.length) {
    expression += ', ';
  }

  return expression + fragmentExprString;
}

function filterForArgs(astNode, modelClass, variables) {
  const args = astNode.arguments;

  if (args.length === 0) {
    return null;
  }

  const modelData = this.models[modelClass.tableName];
  const argObjects = new Array(args.length);

  for (let i = 0, l = args.length; i < l; i += 1) {
    const arg = args[i];
    const value = argValue(arg.value, variables);

    argObjects[i] = {
      name: arg.name.value,
      value,
    };
  }

  return (builder) => {
    for (let i = 0, l = argObjects.length; i < l; i += 1) {
      const arg = argObjects[i];

      if (!(typeof arg.value === 'undefined' && builder.internalOptions().skipUndefined)) {
        modelData.args[arg.name].query(builder, arg.value);
      }
    }
  };
}

function argValue(value, variables) {
  if (value.kind === KIND_VARIABLE) {
    return variables[value.name.value];
  } else if ('value' in value) {
    return value.value;
  } else if (Array.isArray(value.values)) {
    return value.values.map(curValue => argValue(curValue, variables));
  }
  throw new Error(`objection-graphql cannot handle argument value ${JSON.stringify(value)}`);
}

function filterForSelects(astNode, modelClass, astRoot) {
  if (!this.enableSelectFiltering) {
    return null;
  }

  const relations = modelClass.getRelations();
  const selects = collectSelects(astNode, relations, astRoot.fragments, []);

  if (selects.length === 0) {
    return null;
  }

  return (builder) => {
    const { jsonSchema } = modelClass;

    builder.select(selects.map((it) => {
      const col = modelClass.propertyNameToColumnName(it);

      if (jsonSchema.properties[it]) {
        return `${builder.tableRefFor(modelClass)}.${col}`;
      }
      return col;
    }));
  };
}

function collectSelects(astNode, relations, fragments, selects) {
  for (let i = 0, l = astNode.selectionSet.selections.length; i < l; i += 1) {
    const selectionNode = astNode.selectionSet.selections[i];

    if (selectionNode.kind === KIND_FRAGMENT_SPREAD) {
      collectSelects(fragments[selectionNode.name.value], relations, fragments, selects);
    } else {
      const relation = relations[selectionNode.name.value];
      const isMetaField = GRAPHQL_META_FIELDS.indexOf(selectionNode.name.value) !== -1;

      if (!relation && !isMetaField) {
        selects.push(selectionNode.name.value);
      }
    }
  }

  return selects
}

module.exports = { buildEager }