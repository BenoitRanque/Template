const router = require('express').Router()
const routes = [
  'users'
]

routes.forEach(r => {
  router.use('/core', require(`./${r}`))
})

module.exports = router