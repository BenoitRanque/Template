export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    meta: {
      label: 'configuration',
      requireAuthentication: true
    },
    children: [
      {
        path: 'configuration/users',
        component: () => import('pages/configuration/users'),
        meta: {
          label: 'configuration_users',
          requireAuthentication: true,
          requireAuthorization: {
            resource: '',
            action: '',
            posession: ''
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
            resource: '',
            action: '',
            posession: ''
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
            resource: '',
            action: '',
            posession: ''
          }
        }
      }
    ]
  }
]
