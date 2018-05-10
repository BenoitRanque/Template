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
      },
      ...routeModule(configurationRoutes),
      ...routeModule(documentationRoutes)
    ]
  },
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

function routeModule (routes) {
  let pages = routes.slice(1)
  return routes.map(route => {
    route.meta.pages = pages
    return route
  })
}
