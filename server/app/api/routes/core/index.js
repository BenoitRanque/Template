const router = require('express').Router()
const routes = [
  'admin',
  'session'
]

routes.forEach(r => {
  router.use(`/core/${r}`, require(`./${r}`))
})

module.exports = router