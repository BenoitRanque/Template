const router = require('express').Router()

const modules = [
  'core'
]

modules.forEach(moduleName => {
  router.use(require(`./${moduleName}/routes`))
})

module.exports = router
