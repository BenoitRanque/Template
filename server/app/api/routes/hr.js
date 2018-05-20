const router = require('express').Router()
const Resolver = require('@tools/resolver')
const { Employee } = require('@models/hr')

router.route('/employee')
  .get(new Resolver(require('@resources/hr/employee/read'), Employee))
  .post(new Resolver(require('@resources/hr/employee/create'), Employee))
  .put(new Resolver(require('@resources/hr/employee/update'), Employee))
  .delete(new Resolver(require('@resources/hr/employee/delete'), Employee))

module.exports = router