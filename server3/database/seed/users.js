const DEFAULT_PASSWORD = '$2a$10$8yYqN2d1j/OgdX6uIuoZm.pM90xBG7PmcY7CLi2fxN41vdnviovVC' // password is 'admin'

module.exports = db => Promise.all([
  db.mutation.createUser({ data: { username: 'admin', password: DEFAULT_PASSWORD, role: 'ADMIN' } }, `{ id }`),
  db.mutation.createUser({ data: { username: 'jrrhh', password: DEFAULT_PASSWORD, role: 'HR' } }, `{ id }`),
  db.mutation.createUser({ data: { username: 'gadmin', password: DEFAULT_PASSWORD, role: 'MANAGER' } }, `{ id }`),
  db.mutation.createUser({ data: { username: 'jsistemas', password: DEFAULT_PASSWORD, role: 'SUPERVISOR' } }, `{ id }`)
])