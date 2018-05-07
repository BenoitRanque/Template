export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    meta: {
      label: 'documentation'
    },
    children: [
      {
        path: 'documentation/api',
        component: () => import('pages/documentation/api'),
        meta: {
          label: 'documentation_api'
        }
      },
      {
        path: 'documentation/usage',
        component: () => import('pages/documentation/usage'),
        meta: {
          label: 'documentation_usage'
        }
      }
    ]
  }
]
