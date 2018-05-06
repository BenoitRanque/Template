const router = require('express').Router()
const Resolver = require('@tools/resolver')

const { login, logout } = require('@resources/core/session')


routes.post('login', new Resolver(login))
routes.delete('logout', new Resolver(logout))

module.exports = router
