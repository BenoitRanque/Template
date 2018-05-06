const router = require('express').Router()

const routes = [
  'session'
]

routes.forEach(route => {
  router.route('core').use(require(`./${route}`))
})

module.exports = router
