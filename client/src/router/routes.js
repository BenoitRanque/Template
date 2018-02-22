
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
      },
      {
        path: 'admin',
        component: () => import('pages/admin')
      },
      {
        path: 'admin/user',
        component: () => import('pages/admin_user')
      }
    ]
  },

  { // Always leave this as last one
    path: '*',
    redirect: '/404'
  }
]
