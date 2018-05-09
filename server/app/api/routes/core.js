const router = require('express').Router()
const Resolver = require('@tools/resolver') 

router.route('/core/login')
  .post(new Resolver(require('@resources/core/login')))
  
router.route('/core/logout')
  .delete(new Resolver(require('@resources/core/logout')))

router.route('/core/user')
  .get(new Resolver(require('@resources/core/user/read')))
  .post(new Resolver(require('@resources/core/user/create')))
  .update(new Resolver(require('@resources/core/user/update')))
  .delete(new Resolver(require('@resources/core/user/delete')))

router.route('/core/role')
  .get(new Resolver(require('@resources/core/role/read')))
  .post(new Resolver(require('@resources/core/role/create')))
  .update(new Resolver(require('@resources/core/role/update')))
  .delete(new Resolver(require('@resources/core/role/delete')))
  
router.route('/core/privilege')
  .get(new Resolver(require('@resources/core/privilege/read')))
  .post(new Resolver(require('@resources/core/privilege/create')))
  .update(new Resolver(require('@resources/core/privilege/update')))
  .delete(new Resolver(require('@resources/core/privilege/delete')))

module.exports = router