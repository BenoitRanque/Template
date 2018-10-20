
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'Employees', component: () => import('pages/Employees.vue') },
      { path: 'Shifts', component: () => import('pages/Shifts.vue') },
      { path: 'Exceptions', component: () => import('pages/Exceptions.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/ReportLayout.vue'),
    children: [
      { path: 'Reports', component: () => import('pages/Reports.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
