const AccessControl = require('@tools/accessControl')
const Session = require('@tools/session')

const router = require('express').Router()
router.use(require('express').json())
router.use(Session)
router.use(AccessControl.middleware())

router.use('/core', require('./routes/core'))

module.exports = router
