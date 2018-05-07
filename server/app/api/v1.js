const AccessControl = require('@tools/accessControl')
const Session = require('@tools/session')

const router = require('express').Router()

router.use(Session)
router.use(AccessControl.middleware())

const modules = [
  'core'
]

modules.forEach(moduleName => {
  router.use(require(`./routes/${moduleName}`))
})

module.exports = router
