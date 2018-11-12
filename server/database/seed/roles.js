module.exports = prisma => Promise.all([
  prisma.bindings.mutation.createUserRole({ data: { name: 'ADMIN', description: 'Administrador' } }, `{ id }`),
  prisma.bindings.mutation.createUserRole({ data: { name: 'HR', description: 'Recursos Humanos' } }, `{ id }`),
  prisma.bindings.mutation.createUserRole({ data: { name: 'MANAGER', description: 'Manager' } }, `{ id }`),
  prisma.bindings.mutation.createUserRole({ data: { name: 'SUPERVISOR', description: 'Supervisor' } }, `{ id }`)
])