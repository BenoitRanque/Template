import configurationRoutes from './configuration'
import documentationRoutes from './documentation'

export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      {
        path: '',
        component: () => import('pages/index')
      }
    ]
  },

  ...configurationRoutes,
  ...documentationRoutes,

  { // Always leave this as last one
    path: '*',
    component: () => import('layouts/default'),
    children: [
      {
        path: '',
        component: () => import('pages/404')
      }
    ]
  }
]
