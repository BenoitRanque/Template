// const { trueType } = require('@app/services/utils')
// const ACTIONS = ['read:any', 'create:any', 'update:any', 'delete:any', 'read:own', 'create:own', 'update:own', 'delete:own']

// module.exports = class BaseResolver {
//   constructor({ authenticate, authorize, action, resource, method, params, field }, defaultResource, methods) {
//     if (authenticate === undefined) authenticate = true
//     if (authorize === undefined) authorize = authenticate

//     if (resource === undefined) resource = defaultResource
    
//     if (action === undefined && authorize) throw new Error('Resolver Action cannot be undefined if Authorization is required' + authenticate + authorize + action)
//     if (action !== undefined && !ACTIONS.includes(action)) throw new Error(`Resolver Action must be one of ${ACTIONS}, got ${action}` )

//     if (trueType(method) !== 'function') throw new Error(`Invalid value for Resolver Method: expected function, got ${method}`)

//     if (params !== undefined && typeof params !== 'function') throw new Error(`Invalid value for resolver Params: expected function, got ${params}`)

//     this.action = action
//     this.authenticate = authenticate
//     this.authorize = authorize
//     this.field = field
//     this.params = params
//     if (resource) this.resource = resource

//     return async (parent, args, context, info) => {
//       let 
//         permission = null,
//         results = null,
//         boundParams = null,
//         { ac, session } = context

        
//       if (this.authorize) {
//         permission = await ac.authorize(session, this.resource,  this.action)
//       }
//       else if (this.authenticate) {
//         await ac.authenticate(session)
//       }
      
//       if (this.field !== undefined && parent[this.field] !== undefined) {
//         results = parent[this.field]
//       }
//       else {
//         let boundParams = this.params === undefined ? [] : this.params(parent, args, context, info)
//         if (trueType(boundParams) !== 'array') boundParams = [boundParams]
        
//         results = await this.method(this.model, ...boundParams)
//       }

//       if (permission !== null) results = permission.filter(results)

//       return results
//     }
//   }
// }



module.exports = class BaseResolver {
  /*
   * @constructor
   * @param {string} action - Action that will be performed. One of ['read:any', 'create:any', 'update:any', 'delete:any', 'read:own', 'create:own', 'update:own', 'delete:own']
   * @param {boolean} authenticate - Whether authentication is required. Defaults to true
   * @param {boolean} authorize - Whether authorization is required. Defaults to same as authenticate param
   * @param {string} field - The field this resolver is for, if the data is already present there it will simply be returned after auth is checked
   * @param {function} method - Will be executed to fetch the data, if the data is not already present on the parent
   * @param {object} model - Objection.js model for this field
   * @param {string} resource - Resource that will be accessed for this request and on which the action will be performed
   */
  constructor (config) {
    // bracket scope
    {
      let { action, authenticate, authorize, field, method, model, resource } = config

      if (model === undefined) throw new Error('Model is a required argument of the resolver constructor')
      if (authenticate === undefined) authenticate = true
      if (authorize === undefined) authorize = authenticate
      if (model && resource === undefined) resource = model.resource
      if (action === undefined) action = 'read:any'
      if (method === undefined) method = ({ query })  => query
  
      this.config = { action, authenticate, authorize, field, method, model, resource }
    }

    return async (parent, args, context, info) => {
      let
        { ac, session } = context,
        permission = null,
        value = null

      if (this.config.authorize) {
        permission = await ac.authorize(session, this.config.resource,  this.config.action)
      }
      else if (this.config.authenticate) {
        await ac.authenticate(session)
      }

      if (this.config.field && parent[this.config.field] !== undefined) {
        value = parent[this.config.field]
      }
      else {
        value = await this.config.method({ model: this.config.model, parent, args, context, info })
      }

      if (permission !== null) {
        if (permission.granted) {
          value = permission.filter(value)
        }
        else {
          console.log('returning unfiltered values as permission has been denied')
        }
      }
      return value
    }
  }

  static eager (model, query, info) {
    let { expression, filters } = buildEager(model, info)
    return query.eager(expression, filters)
  }

  static filter (model, query, filter) {
    console.log(filter)
    if (filter) {
      Object.keys(filter).forEach(filterName => {
        if (model.filters[filterName] === undefined || model.filters[filterName].method === undefined ) throw new Error(`Could not find filter ${filterName} in model ${model.name}`)

        query = model.filters[filterName].method(query, filter[filterName])
      })
    }
    return query
  }

  static query(model, queryModifier) {
    let method = ({ model, info, args }) => this.eager(model, this.filter(model, queryModifier ? queryModifier(model.query()) : model.query(), args && args.filter), info)
    return {
      type: model.GraphQLType,
      args: model.filters ?  {
        filter: {
          description: 'Filter the results',
          type: model.GraphQLFilterType
        }
      } : undefined,
      resolve: new BaseResolver({
        action: 'read:any',
        model: model,
        method
      })
    }
  }
}

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

