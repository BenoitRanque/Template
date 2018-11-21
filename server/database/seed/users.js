const BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS)
const DEFAULT_PASSWORD = '' // password is 'admin'
const bcrypt = require('bcryptjs')

module.exports = async (prisma, roles) => Promise.all([
  prisma.bindings.mutation.createUser({ data: { username: 'admin', password: await bcrypt.hash(DEFAULT_PASSWORD, BCRYPT_SALT_ROUNDS), roles: { connect: roles[0] } } }, `{ id }`),
  prisma.bindings.mutation.createUser({ data: { username: 'jrrhh', password: await bcrypt.hash(DEFAULT_PASSWORD, BCRYPT_SALT_ROUNDS), roles: { connect: roles[1] } } }, `{ id }`),
  prisma.bindings.mutation.createUser({ data: { username: 'gadmin', password: await bcrypt.hash(DEFAULT_PASSWORD, BCRYPT_SALT_ROUNDS), roles: { connect: roles[2] } } }, `{ id }`),
  prisma.bindings.mutation.createUser({ data: { username: 'jsistemas', password: await bcrypt.hash(DEFAULT_PASSWORD, BCRYPT_SALT_ROUNDS), roles: { connect: roles[3] } } }, `{ id }`)
])
