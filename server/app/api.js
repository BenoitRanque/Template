const express = require('express')
const router = express.Router()

router.use(express.json()) // not ideal. Should be added just before each route, only one relevant ones, after auth
router.use(require('./modules/core/services/session/persist'))

require('./modules').forEach(module => {
  router.use(`/api`, require(`./modules/${module}/routes`))
})

module.exports = router