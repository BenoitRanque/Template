const DEFAULT_PASSWORD = '$2a$10$8yYqN2d1j/OgdX6uIuoZm.pM90xBG7PmcY7CLi2fxN41vdnviovVC' // password is 'admin'

module.exports = (prisma, roles) => Promise.all([
  prisma.bindings.mutation.createUser({ data: { username: 'admin', password: DEFAULT_PASSWORD, roles: { connect: roles[0] } } }, `{ id }`),
  prisma.bindings.mutation.createUser({ data: { username: 'jrrhh', password: DEFAULT_PASSWORD, roles: { connect: roles[1] } } }, `{ id }`),
  prisma.bindings.mutation.createUser({ data: { username: 'gadmin', password: DEFAULT_PASSWORD, roles: { connect: roles[2] } } }, `{ id }`),
  prisma.bindings.mutation.createUser({ data: { username: 'jsistemas', password: DEFAULT_PASSWORD, roles: { connect: roles[3] } } }, `{ id }`)
])
