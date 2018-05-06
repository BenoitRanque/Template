const router = require('express').Router()
const Resolver = require('@tools/resolver')

const { User } = require(`../models/index`)
const session = require('../resources/session')

router.route('session')
  .use(new Resolver(User, session, {
    authenticate: false
  }))

module.exports = router
