const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt, GraphQLNonNull } = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'CorePrivilege',
  description: 'A privilege that can be assigned to a role',
  fields: () => ({
    privilege_name: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    resource: {
      type: GraphQLString
    },
    action: {
      type: new GraphQLEnumType({
        name: 'AccessControlActionValues',
        values: {
          'read:any': {
            name: 'Read Any',
            description: 'Read Resource with any ownership'
          },
          'create:any': {
            name: 'Create Any',
            description: 'Create Resource with any ownership'
          },
          'update:any': {
            name: 'Update Any',
            description: 'Update Resource with any ownership'
          },
          'delete:any': {
            name: 'Delete Any',
            description: 'Delete Resource with any ownership'
          },
          'read:own': {
            name: 'Read Own',
            description: 'Read Resource with own ownership'
          },
          'create:own': {
            name: 'Create Own',
            description: 'Create Resource with own ownership'
          },
          'update:own': {
            name: 'Update Own',
            description: 'Update Resource with own ownership'
          },
          'delete:own': {
            name: 'Delete Own',
            description: 'Delete Resource with own ownership'
          }
        },
        description: 'Possible values for access control actions'
      })
    },
    module_id: {
      type: GraphQLString
    }
  })
})