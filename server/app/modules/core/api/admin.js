const router = require('express').Router()

const UserHandler = require('../handlers/users')

router
  .route('/users')
  .get(require('../handlers/users/all'))
  .get('/:id', require('../handlers/users/get'))
  .post()
  .put('/:id')
  .delete('/:id')


module.exports = router