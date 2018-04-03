const router = require('express').Router()

const UserHandler = require('@handlers/core/users')

router
  .route('/users')
  .get(require('@handlers/core/users/all'))
  .get('/:id', require('@handlers/core/users/get'))
  .post()
  .put('/:id')
  .delete('/:id')


module.exports = router