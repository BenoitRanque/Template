const { Model } = require('objection')
// const { modelToGraphQLFilterType, modelToGraphQLFields, modelToGraphQLInputType, modelToGraphQLType } = require('./model_toGraphQLType')
// const { buildEager } = require('./model_buildEager')
// const { GraphQLInputObjectType, GraphQLObjectType } = require('graphql')
const {
  GraphQLObjectType, GraphQLEnumType, GraphQLBoolean, GraphQLString, GraphQLFloat, GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLInputObjectType
} = require('graphql')

Model.knex(require('@db/knex'))

module.exports = class BaseModel extends Model {

  static get GraphQLType () {
    return modelToGraphQLType(this)
    // if (!this.GraphQLTypeCache) this.GraphQLTypeCache = modelToGraphQLType(this, {})
    // // console.log(this.GraphQLTypeCache)
    // return this.GraphQLTypeCache
  }
  
  static get GraphQLFilterType () {
    if (!this.filters) throw new Error(`No filter has been specified on model ${this.name}`)
    return modelToGraphQLFilterType(this)
    // if (!this.GraphQLFilterTypeCache) this.GraphQLFilterTypeCache = modelToGraphQLFilterType(this, {})
    // console.log(this.GraphQLFilterTypeCache)
    // return this.GraphQLFilterTypeCache
  }
  
  static get GraphQLInputType () {
    return modelToGraphQLInputType(this)
    // if (!this.GraphQLInputTypeCache) this.GraphQLInputTypeCache = modelToGraphQLInputType(this, {})
    // return this.GraphQLInputTypeCache
  }

  // static get GraphQLType () {
  //   return {
  //     cache: {
  //       InputType: undefined,
  //       FilterType: undefined,
  //       QueryType: undefined
  //     },
  //     get Input () {
  //       if (!this.cache.InputType) {
  //         this.cache.InputType = new GraphQLInputObjectType(this.GraphQLType.Config({ mode: 'input' }))
  //       }
  //       return this.GraphQLType.cache.InputType
  //     },
  //     get Filter () {
  //       if (!this.cache.FilterType) {
  //         if (!this.GraphQLFilters || !Object.keys(this.GraphQLFilters).length) throw new Error(`No filter specified for model ${this.name}`)
  //         this.cache.FilterType = new GraphQLInputObjectType(this.GraphQLType.Config({ mode: 'filter' }))
  //       }
  //       return this.GraphQLType.cache.FilterType
  //     },
  //     get Query () {
  //       console.log(this)
  //       if (!this.GraphQLType.cache.QueryType) {
  //         this.GraphQLType.cache.QueryType = new GraphQLObjectType(this.GraphQLType.Config({ mode: 'query' }))
  //       }
  //       return this.GraphQLType.cache.QueryType
  //     },
  //     Config (options) {
  //       return modelToGraphQLTypeConfig(this, options)
  //     }
  //   }
  // }

  // static getGraphQLTypeConfig(options) {
  //   return modelToGraphQLTypeConfig(this, options)
  // }

  // static getGraphQLType () {
  //   if (this.GraphQLType === undefined) {
  //     this.GraphQLType = new GraphQLObjectType(this.getGraphQLTypeConfig({ mode: 'query' }))
  //   }
  //   return this.GraphQLType
  // }

  // static getGraphQLFilterType () {
  //   if (this.GraphQLFilterType === undefined) {
  //     this.GraphQLFilterType = new GraphQLInputObjectType(this.getGraphQLTypeConfig({ mode: 'filter', suffix: 'Filter' }))
  //   }
  //   return this.GraphQLFilterType
  // }

  // static getGraphQLInputType () {
  //   if (this.GraphQLInputType === undefined) {
  //     this.GraphQLInputType = new GraphQLInputObjectType(this.getGraphQLTypeConfig({ mode: 'input' , suffix: 'Input' }))
  //   }
  //   return this.GraphQLInputType
  // }

  // static queryResolver({ single }) {
  //   let queryMethod
  //   if (single) {
  //     queryMethod = ({ model, info, args }) => Resolver.eager(model, Resolver.filter(model, model.query(), args && args.filter), info).first()
  //   }
  //   else {
  //     queryMethod = ({ model, info, args }) => Resolver.eager(model, Resolver.filter(model, model.query(), args && args.filter), info)
  //   }
  //   return {
  //     type: this.GraphQLType.Query,
  //     args: {
  //       filter: {
  //         description: 'Filter the results',
  //         type: this.getGraphQLFilterType()
  //       }
  //     },
  //     resolve: new Resolver({
  //       action: 'read:any',
  //       model: this,
  //       method: queryMethod
  //     })
  //   }
  // }
}

// class PrivilegeAttributes extends BaseModel {

//   static get tableName() {
//     return 'core_privilege_attributes'
//   }

//   static get idColumn() {
//     return ['privilege_id', 'attribute']
//   }

//   static get name() {
//     return 'CorePrivilegeAttribute'
//   }

//   static get resource() {
//     return this.name
//   }

//   static get jsonSchema () {
//     return {
//       description: 'A possible atribute for a privilege of the core module',
//       type: 'object',
//       required: ['privilege_id'],

//       properties: {
//         privilege_id: {
//           type: 'string'
//         },
//         attribute: {
//           type: 'string'
//         }
//       }
//     }
//   }

//   static get relationMappings() {
//     return {
//       privilege: {
//         relation: BaseModel.BelongsToOneRelation,
//         modelClass: Privilege,
//         join: {
//           from: 'core_privilege_attributes.privilege_id',
//           to: 'core_privileges.privilege_id'
//         }
//       }
//     }
//   }
// }

// class Privilege extends BaseModel {
//   static get tableName() {
//     return 'core_privileges'
//   }
//   static get idColumn() {
//     return 'privilege_id'
//   }

//   static get name() {
//     return 'CorePrivilege'
//   }

//   static get resource() {
//     return this.name
//   }

//   static get jsonSchema () {
//     return {
//       description: 'A privilege of the core module',
//       type: 'object',
//       required: ['privilege_id'],

//       properties: {
//         privilege_id: {
//           type: 'string'
//         },
//         privilege_name: {
//           type: 'string'
//         },
//         description: {
//           type: 'string'
//         },
//         module_id: {
//           type: 'string'
//         },
//         resource: {
//           description: 'Optional description',
//           type: 'string'
//         },
//         action: {
//           type: 'string',
//           name: 'CorePrivilegeAction',
//           description: 'possible action',
//           enum: [
//             'read:any',
//             'create:any',
//             'update:any',
//             'delete:any',
//             'read:own',
//             'create:own',
//             'update:own',
//             'delete:own'
//           ],
//           enumOptions: [
//             {
//               name: 'ReadAny',
//               value: 'read:any',
//               description: 'Read Resource with any ownership'
//             },
//             {
//               name: 'CreateAny',
//               value: 'create:any',
//               description: 'Create Resource with any ownership'
//             },
//             {
//               name: 'UpdateAny',
//               value: 'update:any',
//               description: 'Update Resource with any ownership'
//             },
//             {
//               name: 'DeleteAny',
//               value: 'delete:any',
//               description: 'Delete Resource with any ownership'
//             },
//             {
//               name: 'ReadOwn',
//               value: 'read:own',
//               description: 'Read Resource with own ownership'
//             },
//             {
//               name: 'CreateOwn',
//               value: 'create:own',
//               description: 'Create Resource with own ownership'
//             },
//             {
//               name: 'UpdateOwn',
//               value: 'update:own',
//               description: 'Update Resource with own ownership'
//             },
//             {
//               name: 'DeleteOwn',
//               value: 'delete:own',
//               description: 'Delete Resource with own ownership'
//             }
//           ]
//         }
//       }
//     }
//   }

//   static get relationMappings() {
//     return {
//       attributes: {
//         relation: BaseModel.HasManyRelation,
//         modelClass: PrivilegeAttributes,
//         join: {
//           from: 'core_privileges.privilege_id',
//           to: 'core_privilege_attributes.privilege_id'
//         }
//       }
//     }
//   }
// }

// module.exports = {
//   BaseModel,
//   Privilege,
//   PrivilegeAttributes
// }




const cache = {}

function cached(name, init) {
  if (!cache[name]) cache[name] = init()
  return cache[name]
}


function modelToGraphQLType (model) {
  let config = { inputType: false }
  let name = `${model.name}`
  let initFunc = () => new GraphQLObjectType({
    name,
    description: `Filter type for model ${model.name}`,
    fields: () => ({
      ...schemaToGraphQLFields(model.jsonSchema.properties, model.resolvers, config),
      ...relationsToGraphQLFields(model.relationMappings, model => model.GraphQLType, config)
    })
  })
  return cached(name, initFunc)
}

function modelToGraphQLFilterType (model) {
  let config = { inputType: true }
  let name = `${model.name}_filter`
  let initFunc = () => new GraphQLInputObjectType({
    name,
    description: `Filter type for model ${model.name}`,
    fields: () => schemaToGraphQLFields(model.filters, null, config),
  })
  return cached(name, initFunc)
}

function modelToGraphQLInputType (model) {
  let config = { inputType: true }
  let name = `${model.name}_input`
  let initFunc = () => new GraphQLInputObjectType({
    name,
    description: `Filter type for model ${model.name}`,
    fields: () => ({
      ...schemaToGraphQLFields(model.jsonSchema.properties, null, config),
      ...relationsToGraphQLFields(model.relationMappings, model => model.GraphQLInputType, config)
    })
  })
  return cached(name, initFunc)
}

function relationsToGraphQLFields(relations, getModelType, config) {
  const Resolver = require('./resolver')
  if (!relations) return {}

  let relationObject  = Object.keys(relations).reduce((result, relationName) => {
    let relation = relations[relationName]
    let model = relation.modelClass
    let field = {
      type: getModelType(model),
      description: relation.description
    }

    if (!config.inputType) {
      if (model.filters) {
        field.args = {
          filter: {
            description: `Filter for ${model.name}`,
            type: model.GraphQLFilterType
          }
        }
      }
      field.resolve = new Resolver({ model, field: relationName })
    }

    if (relation.relation === Model.HasManyRelation || relation.relation === Model.ManyToManyRelation) field.type = new GraphQLList(field.type)

    result[relationName] = field
    return result
  }, {})
  // console.log(relationObject)
  return relationObject
}

function schemaToGraphQLFields (schema, resolvers, config) {
  return Object.keys(schema).reduce((fields, fieldName) =>  {
    let field = {
      type: toGraphQLType(schema[fieldName], fieldName, config),
      description: schema[fieldName].description
    }

    // input type wil respecte required fields
    if (config.inputType && schema.required && schema.required.inlcudes(fieldName)) field.type = new GraphQLNonNull(field.type)


    if (!config.inputType && resolvers) {
      let resolver = resolvers[fieldName]
      if (resolver) field.resolve = resolver
    }

    fields[fieldName] = field
    return fields
  }, {})
}

function toGraphQLType (schema, fieldName, config) {
  if (schema.enum) return enumToGraphQLType(schema, fieldName, config)
  switch (schema.type) {
    // disabled for now. Not sure I'll use this
    // case 'object': return objectToGraphQLType(schema, fieldName, config)

    case 'array': return new GraphQLList(toGraphQLType(schema.items, fieldName, config))
    case 'string': return GraphQLString
    case 'integer': return GraphQLInt
    case 'number': return GraphQLFloat
    case 'boolean': return GraphQLBoolean;
    default: throw new Error(`Unable to convert type ${schema.type} on schema field ${fieldName} to GraphQL type`)
  }
}

function enumToGraphQLType(schema, fieldName, config) {
  let name = `${schema.name || fieldName}_enum`
  let initFunc = () => new GraphQLEnumType({
    name,
    description: schema.description,
    values: schema.items
  })
  return cached(name, initFunc)
}

function objectToGraphQLType(schema, fieldName, config) {
  let name = `${schema.name || fieldName}_object${ config.inputType ?  '_input' : '' }`
  let initFunc = () => {
    // todo: possible naming conflict here
    let typeConfig = {
      name,
      description: schema.description,
      fields: () => toGraphQLFields(schema.properties, undefined, config)
    }
    if (config.inputType) return new GraphQLInputObjectType(typeConfig)
    return new GraphQLObjectType(typeConfig)
  }
}

