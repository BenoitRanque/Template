const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql')
const RoleResolver = require('./resource')
const UserResolver = require('../User//resource')

module.exports = new GraphQLObjectType({
  name: 'CoreRole',
  description: 'A custom user role',
  fields: () => ({
    role_id: {
      type: GraphQLString
    },
    grantor_id: {
      type: GraphQLString
    },
    grantor: {
      type: require('../User/schema'),
      resolve: new UserResolver('read:any', 'userById', role =>  role.grantor_id)
    },
    role_name: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    extends: {
      type: new GraphQLList(require('./schema')),
      resolve: new RoleResolver('read:any', 'extendedRole', role => role.role_id)
    }
  })
})