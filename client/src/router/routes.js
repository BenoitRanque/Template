
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), meta: { label: 'Inicio' } },
      { path: 'Employees', component: () => import('pages/Employees.vue'), meta: { label: 'Empleados' } },
      { path: 'Shifts', component: () => import('pages/Shifts.vue'), meta: { label: 'Horarios' } },
      { path: 'Reports', component: () => import('pages/Reports.vue'), meta: { label: 'Reportes' } },
      { path: 'Exceptions', component: () => import('pages/Exceptions.vue'), meta: { label: 'Boletas' } }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Error404.vue'), meta: { label: 'Error 404' } }
    ]
  })
}

export default routes
