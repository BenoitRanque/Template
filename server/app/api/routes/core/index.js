const router = require('express').Router()

const routes = [
  'session'
]

routes.forEach(route => {
  router.use('/core', require(`./${route}`))
})

module.exports = router
