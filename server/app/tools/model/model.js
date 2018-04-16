const { Model } = require('objection')
const { modelToGraphQLFilterType, modelToGraphQLFields, modelToGraphQLInputType, modelToGraphQLType } = require('./model_toGraphQLType')
const { buildEager } = require('./model_buildEager')
const { GraphQLInputObjectType, GraphQLObjectType } = require('graphql')

Model.knex(require('@db/knex'))

module.exports = class BaseModel extends Model {

  static get GraphQLType () {
    if (!this.GraphQLTypeCache) this.GraphQLTypeCache = modelToGraphQLType(this, {})
    // console.log(this.GraphQLTypeCache)
    return this.GraphQLTypeCache
  }

  static get GraphQLFilterType () {
    if (!this.GraphQLFilterTypeCache) this.GraphQLFilterTypeCache = modelToGraphQLFilterType(this, {})
    console.log(this.GraphQLFilterTypeCache)
    return this.GraphQLFilterTypeCache
  }

  static get GraphQLInputType () {
    if (!this.GraphQLInputTypeCache) this.GraphQLInputTypeCache = modelToGraphQLInputType(this, {})
    return this.GraphQLInputTypeCache
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