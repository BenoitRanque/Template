const router = require('express').Router()
const h = require('../services/handler')

router
  .route('/login')
  .post(h(require('../handlers/session/login'), (req, res, next) => [ req.body.username, req.body.password, req.session ]))

router
  .route('/logout')
  .get(require('../handlers/session/logout'))

router
  .route('/user')
  .get(require('../handlers/session/user.read'))
  .put(require('../handlers/session/user.update'))

module.exports = router