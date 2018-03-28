const express = require('express')
const router = express.Router()

router.use(express.json()) // not ideal. Should be added just before each route, only one relevant ones, after auth
router.use(require('./services').session)

require('./modules').forEach(module => {
  router.use(`/api`, require(`./modules/${module}/routes`))
})

module.exports = router