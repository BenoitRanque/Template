module.exports = (prisma, users) => Promise.all([
  prisma.bindings.mutation.createDepartment({ data: { name: 'ALMACEN', supervisors: { connect: { id: users[0].id } } } }, `{ id }`),
  prisma.bindings.mutation.createDepartment({ data: { name: 'BIOLOGICA', supervisors: { connect: { id: users[0].id } } } }, `{ id }`),
  prisma.bindings.mutation.createDepartment({ data: { name: 'BOUTIQUE', supervisors: { connect: { id: users[0].id } } } }, `{ id }`),
  prisma.bindings.mutation.createDepartment({ data: { name: 'COMERCIAL', supervisors: { connect: { id: users[0].id } } } }, `{ id }`),
  prisma.bindings.mutation.createDepartment({ data: { name: 'CONTABILIDAD', supervisors: { connect: { id: users[0].id } } } }, `{ id }`),
  prisma.bindings.mutation.createDepartment({ data: { name: 'EJECUTIVOS', supervisors: { connect: { id: users[0].id } } } }, `{ id }`),
  prisma.bindings.mutation.createDepartment({ data: { name: 'JARDINERIA', supervisors: { connect: { id: users[0].id } } } }, `{ id }`),
  prisma.bindings.mutation.createDepartment({ data: { name: 'LIMPIEZA ', supervisors: { connect: { id: users[0].id } } } }, `{ id }`),
  prisma.bindings.mutation.createDepartment({ data: { name: 'MANTENIMIENTO', supervisors: { connect: { id: users[0].id } } } }, `{ id }`),
  prisma.bindings.mutation.createDepartment({ data: { name: 'PISCINAS', supervisors: { connect: { id: users[0].id } } } }, `{ id }`),
  prisma.bindings.mutation.createDepartment({ data: { name: 'RESTAURANTE', supervisors: { connect: { id: users[0].id } } } }, `{ id }`),
  prisma.bindings.mutation.createDepartment({ data: { name: 'RECURSOS HUMANOS', supervisors: { connect: { id: users[0].id } } } }, `{ id }`),
  prisma.bindings.mutation.createDepartment({ data: { name: 'SERVICIOS GENERALES', supervisors: { connect: { id: users[0].id } } } }, `{ id }`),
  prisma.bindings.mutation.createDepartment({ data: { name: 'SISTEMAS', supervisors: { connect: [{ id: users[0].id }, { id: users[3].id }] } } }, `{ id }`)
])