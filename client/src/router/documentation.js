export default [
  {
    path: 'documentation',
    component: () => import('pages/documentation'),
    meta: {
      label: 'documentation'
    }
  },
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
