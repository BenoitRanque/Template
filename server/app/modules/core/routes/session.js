const router = require('express').Router()

router
  .route('/login')
  .post(require('../services/session/login'))

router
  .route('/logout')
  .get(require('../services/session/logout'))

module.exports = router