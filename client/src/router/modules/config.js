export default {
  hash: 'config',
  layout: 'index',
  meta: {
    label: 'config',
    requireAuthentication: true
  },
  tabs: [
    {
      hash: 'users',
      layout: 'workspace',
      meta: {
        label: 'config_users',
        requireAuthentication: true,
        requireAuthorization: {
          resource: 'CoreUser',
          posession: 'any'
        }
      }
    },
    {
      hash: 'roles',
      layout: 'workspace',
      meta: {
        label: 'config_roles',
        requireAuthentication: true,
        requireAuthorization: {
          resource: 'CoreRole',
          posession: 'any'
        }
      }
    },
    {
      hash: 'privileges',
      layout: 'workspace',
      meta: {
        label: 'config_privileges',
        requireAuthentication: true,
        requireAuthorization: {
          resource: 'CorePrivilege',
          posession: 'any'
        }
      }
    }
  ]
}
