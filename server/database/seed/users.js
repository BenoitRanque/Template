const DEFAULT_PASSWORD = '$2a$10$8yYqN2d1j/OgdX6uIuoZm.pM90xBG7PmcY7CLi2fxN41vdnviovVC' // password is 'admin'

module.exports = prisma => Promise.all([
  prisma.bindings.mutation.createUser({ data: { username: 'admin', password: DEFAULT_PASSWORD, role: 'ADMIN' } }, `{ id }`),
  prisma.bindings.mutation.createUser({ data: { username: 'jrrhh', password: DEFAULT_PASSWORD, role: 'HR' } }, `{ id }`),
  prisma.bindings.mutation.createUser({ data: { username: 'gadmin', password: DEFAULT_PASSWORD, role: 'MANAGER' } }, `{ id }`),
  prisma.bindings.mutation.createUser({ data: { username: 'jsistemas', password: DEFAULT_PASSWORD, role: 'SUPERVISOR' } }, `{ id }`)
])
