const router = require('express').Router()
const Resolver = require('@tools/resolver')
const {
  AttSchedule, AttException, AttExceptionAuthorization, AttTransaction, AttShift, AttTimetype, Employee, Department } = require('@models/hr')

router.route('/attexception')
  .get(new Resolver(require('@resources/hr/attexception/read'), AttException))
  .post(new Resolver(require('@resources/hr/attexception/create'), AttException))
  .put(new Resolver(require('@resources/hr/attexception/update'), AttException))
  .delete(new Resolver(require('@resources/hr/attexception/delete'), AttException))

router.route('/attexception/automate')
  .post(new Resolver(require('@resources/hr/attexception/automate/create'), AttException))

router.route('/attexception/authorization')
  .post(new Resolver(require('@resources/hr/attexception/authorization/create'), AttExceptionAuthorization))

router.route('/attshift')
  .get(new Resolver(require('@resources/hr/attshift/read'), AttShift))
  .post(new Resolver(require('@resources/hr/attshift/create'), AttShift))
  .put(new Resolver(require('@resources/hr/attshift/update'), AttShift))
  .delete(new Resolver(require('@resources/hr/attshift/delete'), AttShift))

router.route('/attschedule')
  .get(new Resolver(require('@resources/hr/attschedule/read'), AttSchedule))
  .post(new Resolver(require('@resources/hr/attschedule/create'), AttSchedule))
  .put(new Resolver(require('@resources/hr/attschedule/update'), AttSchedule))
  .delete(new Resolver(require('@resources/hr/attschedule/delete'), AttSchedule))

router.route('/atttransaction')
  .get(new Resolver(require('@resources/hr/atttransaction/read'), AttTransaction))
  .post(new Resolver(require('@resources/hr/atttransaction/create'), AttTransaction))
  .put(new Resolver(require('@resources/hr/atttransaction/update'), AttTransaction))
  .delete(new Resolver(require('@resources/hr/atttransaction/delete'), AttTransaction))

router.route('/atttimetype')
  .get(new Resolver(require('@resources/hr/atttimetype/read'), AttTimetype))
  .post(new Resolver(require('@resources/hr/atttimetype/create'), AttTimetype))
  .put(new Resolver(require('@resources/hr/atttimetype/update'), AttTimetype))
  .delete(new Resolver(require('@resources/hr/atttimetype/delete'), AttTimetype))

router.route('/employee')
  .get(new Resolver(require('@resources/hr/employee/read'), Employee))
  .post(new Resolver(require('@resources/hr/employee/create'), Employee))
  .put(new Resolver(require('@resources/hr/employee/update'), Employee))
  .delete(new Resolver(require('@resources/hr/employee/delete'), Employee))

router.route('/department')
  .get(new Resolver(require('@resources/hr/department/read'), Department))
  .post(new Resolver(require('@resources/hr/department/create'), Department))
  .put(new Resolver(require('@resources/hr/department/update'), Department))
  .delete(new Resolver(require('@resources/hr/department/delete'), Department))


router.route('/attreport')
  .get(new Resolver(require('@resources/hr/attreport/read'), Employee))

module.exports = router
