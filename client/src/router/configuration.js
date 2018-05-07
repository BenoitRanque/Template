export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    meta: {
      label: 'configuration'
    },
    children: [
      {
        path: 'configuration/users',
        component: () => import('pages/configuration/users'),
        meta: {
          label: 'configuration_users'
        }
      },
      {
        path: 'configuration/roles',
        component: () => import('pages/configuration/roles'),
        meta: {
          label: 'configuration_roles'
        }
      },
      {
        path: 'configuration/privileges',
        component: () => import('pages/configuration/privileges'),
        meta: {
          label: 'configuration_privileges'
        }
      }
    ]
  }
]
