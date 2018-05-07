import configurationRoutes from './configuration'
import documentationRoutes from './documentation'

export default [
  // {
  //   path: '/login',
  //   component: () => import('pages/login')
  // },
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      {
        path: '',
        component: () => import('pages/index')
      },
      {
        path: '404',
        component: () => import('pages/404')
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
