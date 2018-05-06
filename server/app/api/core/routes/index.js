const router = require('express').Router()

router.route('core')
  .use(require('./session'))

module.exports = router
