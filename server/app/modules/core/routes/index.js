const router = require('express').Router()
const routes = [
  'users',
  'session'
]

routes.forEach(r => {
  router.use(`/core/${r}`, require(`./${r}`))
})

module.exports = router