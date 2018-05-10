export default [
  {
    path: 'configuration',
    component: () => import('pages/configuration'),
    meta: {
      label: 'configuration',
      requireAuthentication: true
    }
  },
  {
    path: 'configuration/users',
    component: () => import('pages/configuration/users'),
    meta: {
      label: 'configuration_users',
      requireAuthentication: true,
      requireAuthorization: {
        resource: 'CoreUser',
        posession: 'any'
      }
    }
  },
  {
    path: 'configuration/roles',
    component: () => import('pages/configuration/roles'),
    meta: {
      label: 'configuration_roles',
      requireAuthentication: true,
      requireAuthorization: {
        resource: 'CoreRole',
        posession: 'any'
      }
    }
  },
  {
    path: 'configuration/privileges',
    component: () => import('pages/configuration/privileges'),
    meta: {
      label: 'configuration_privileges',
      requireAuthentication: true,
      requireAuthorization: {
        resource: 'CorePrivilege',
        posession: 'any'
      }
    }
  }
]
