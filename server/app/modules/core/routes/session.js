const router = require('express').Router()

router
  .route('/login')
  .post(require('../services/session/login'))

module.exports = router