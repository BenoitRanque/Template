const router = require('express').Router()
const h = require('@services/handler')

router
  .route('/login')
  .post(h(require('@handlers/core/session/login'), ({ session, body }) => ({ session, body })))

router
  .route('/logout')
  .get(require('../handlers/session/logout'))

router
  .route('/user')
  .get(require('../handlers/session/user.read'))
  .put(require('../handlers/session/user.update'))

module.exports = router