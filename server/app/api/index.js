const express = require('express')
const router = express.Router()

router.use(express.json()) // not ideal. Should be added just before each route, only one relevant ones, after auth
router.use(require('@services/session'))
router.use(require('@services/graphql'))

require('@app/modules').forEach(m => {
  router.use(`/api`, require(`@routes/${m}`))
})

module.exports = router