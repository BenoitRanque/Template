const router = require('express').Router()
const Resolver = require('@tools/resolver') 

router.route('/login')
  .post(new Resolver(require('@resources/core/login')))
  
router.route('/logout')
  .delete(new Resolver(require('@resources/core/logout')))

router.route('/user')
  .get(new Resolver(require('@resources/core/user/read')))
  .post(new Resolver(require('@resources/core/user/create')))
  .put(new Resolver(require('@resources/core/user/update')))
  .delete(new Resolver(require('@resources/core/user/delete')))

router.route('/role')
  .get(new Resolver(require('@resources/core/role/read')))
  .post(new Resolver(require('@resources/core/role/create')))
  .put(new Resolver(require('@resources/core/role/update')))
  .delete(new Resolver(require('@resources/core/role/delete')))
  
router.route('/privilege')
  .get(new Resolver(require('@resources/core/privilege/read')))
  .post(new Resolver(require('@resources/core/privilege/create')))
  .put(new Resolver(require('@resources/core/privilege/update')))
  .delete(new Resolver(require('@resources/core/privilege/delete')))

module.exports = router