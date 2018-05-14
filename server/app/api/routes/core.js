const router = require('express').Router()
const Resolver = require('@tools/resolver')
const { User, Role, Privilege, Module, Resource } = require('@models/core')

router.route('/login')
  .post(new Resolver(require('@resources/core/login'), User))

router.route('/logout')
  .delete(new Resolver(require('@resources/core/logout')))

router.route('/user')
  .get(new Resolver(require('@resources/core/user/read'), User))
  .post(new Resolver(require('@resources/core/user/create'), User))
  .put(new Resolver(require('@resources/core/user/update'), User))
  .delete(new Resolver(require('@resources/core/user/delete'), User))

router.route('/role')
  .get(new Resolver(require('@resources/core/role/read'), Role))
  .post(new Resolver(require('@resources/core/role/create'), Role))
  .put(new Resolver(require('@resources/core/role/update'), Role))
  .delete(new Resolver(require('@resources/core/role/delete'), Role))

router.route('/privilege')
  .get(new Resolver(require('@resources/core/privilege/read'), Privilege))
  .post(new Resolver(require('@resources/core/privilege/create'), Privilege))
  .put(new Resolver(require('@resources/core/privilege/update'), Privilege))
  .delete(new Resolver(require('@resources/core/privilege/delete'), Privilege))

router.route('/module')
  .get(new Resolver(require('@resources/core/module/read'), Module))
  .post(new Resolver(require('@resources/core/module/create'), Module))
  .put(new Resolver(require('@resources/core/module/update'), Module))
  .delete(new Resolver(require('@resources/core/module/delete'), Module))

router.route('/resource')
  .get(new Resolver(require('@resources/core/resource/read'), Resource))
  .post(new Resolver(require('@resources/core/resource/create'), Resource))
  .put(new Resolver(require('@resources/core/resource/update'), Resource))
  .delete(new Resolver(require('@resources/core/resource/delete'), Resource))

module.exports = router