const { Model } = require('objection')
const { modelToGraphQLTypeConfig } = require('./model_toGraphQLType')
const { buildEager } = require('./model_buildEager')
const { GraphQLInputObjectType, GraphQLObjectType } = require('graphql')

Model.knex(require('@db/knex'))

module.exports = class BaseModel extends Model {

  static getGraphQLTypeConfig(options) {
    return modelToGraphQLTypeConfig(this, options)
  }

  static getGraphQLType () {
    if (this.GraphQLType === undefined) {
      this.GraphQLType = new GraphQLObjectType(this.getGraphQLTypeConfig({}))
    }
    return this.GraphQLType
  }

  static getGraphQLFilterType () {
    if (this.GraphQLFilterType === undefined) {
      this.GraphQLFilterType = new GraphQLInputObjectType(this.getGraphQLTypeConfig({ isFilterType: true }))
    }
    return this.GraphQLFilterType
  }

  static getGraphQLInputType () {
    if (this.GraphQLInputType === undefined) {
      this.GraphQLInputType = new GraphQLInputObjectType(this.getGraphQLTypeConfig({ isInputType: true }))
    }
    return this.GraphQLInputType
  }

  static getEager(info) {
    let { expression, filters } = buildEager(info.fieldNodes[0], this, info)
    return [ expression, filters ]
  }
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