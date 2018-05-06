const AccessControl = require('@tools/accesControl')
const Session = require('@tools/session')

const router = require('express').Router()

router.use(Session)
router.use(AccessControl.middelware())

const modules = [
  'core'
]

modules.forEach(moduleName => {
  router.use(require(`./${moduleName}/routes`))
})

module.exports = router
