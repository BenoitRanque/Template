import moduleRoutes from './modules'

export default [
  {
    path: '/',
    component: () => import('layouts/index'),
    children: [
      {
        path: '',
        component: () => import('pages/index'),
        meta: {
          label: 'index'
        }
      },
      {
        path: 'user',
        component: () => import('pages/user'),
        meta: {
          label: 'user',
          requireAuthentication: true
        }
      }
    ]
  },
  ...[].concat(...moduleRoutes.map(mapRoutes)),
  { // Always leave this as last one
    path: '*',
    component: () => import('layouts/default'),
    children: [
      {
        path: '',
        component: () => import('pages/404'),
        meta: {
          label: '404'
        }
      }
    ]
  }
]

function mapRoutes (root) {
  let output = []
  let layoutIndexes = {}

  let tabs = root.tabs.map(tab => ({
    meta: tab.meta,
    hash: tab.hash,
    root: root.hash
  }))

  addRoute(root, tabs)
  root.tabs.forEach(route => {
    addRoute(route, tabs)
  })

  return output

  function addRoute (route, tabs) {
    let { hash, layout, meta } = route
    if (layoutIndexes[layout] === undefined) {
      layoutIndexes[layout] = output.length
      output.push({
        path: `/${root.hash}`,
        component: () => import(`layouts/${layout}`),
        children: []
      })
    }

    meta.tabs = tabs
    output[layoutIndexes[layout]].children.push({
      path: route === root ? '' : hash,
      component: () => import(`pages/${root.hash}/${route === root ? 'index' : hash}`),
      meta
    })
  }
}
