const router = require('express').Router()
const Resolver = require('@tools/resolver')

const { login, logout } = require('@resources/core/session')

router.post('/login', new Resolver(login))
router.delete('/logout', new Resolver(logout))

module.exports = router
