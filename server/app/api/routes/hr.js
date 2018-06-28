const router = require('express').Router()
const Resolver = require('@tools/resolver')
const {
  AttSchedule, AttException, AttExceptionRequest, AttExceptionAuthorization, AttExceptionCancelation, AttShift, AttShiftAssign, AttType, Employee } = require('@models/hr')

router.route('/attexception')
  .get(new Resolver(require('@resources/hr/attexception/read'), AttException))
  .post(new Resolver(require('@resources/hr/attexception/create'), AttException))
  .put(new Resolver(require('@resources/hr/attexception/update'), AttException))
  .delete(new Resolver(require('@resources/hr/attexception/delete'), AttException))

router.route('/attexceptionrequest')
  .get(new Resolver(require('@resources/hr/attexceptionrequest/read'), AttExceptionRequest))
  .post(new Resolver(require('@resources/hr/attexceptionrequest/create'), AttExceptionRequest))
  .put(new Resolver(require('@resources/hr/attexceptionrequest/update'), AttExceptionRequest))
  .delete(new Resolver(require('@resources/hr/attexceptionrequest/delete'), AttExceptionRequest))

router.route('/attexceptionauthorization')
  .get(new Resolver(require('@resources/hr/attexceptionauthorization/read'), AttExceptionAuthorization))
  .post(new Resolver(require('@resources/hr/attexceptionauthorization/create'), AttExceptionAuthorization))
  .put(new Resolver(require('@resources/hr/attexceptionauthorization/update'), AttExceptionAuthorization))
  .delete(new Resolver(require('@resources/hr/attexceptionauthorization/delete'), AttExceptionAuthorization))

router.route('/attexceptioncancelation')
  .get(new Resolver(require('@resources/hr/attexceptioncancelation/read'), AttExceptionCancelation))
  .post(new Resolver(require('@resources/hr/attexceptioncancelation/create'), AttExceptionCancelation))
  .put(new Resolver(require('@resources/hr/attexceptioncancelation/update'), AttExceptionCancelation))
  .delete(new Resolver(require('@resources/hr/attexceptioncancelation/delete'), AttExceptionCancelation))

router.route('/attshiftassign')
  .get(new Resolver(require('@resources/hr/attshiftassign/read'), AttShiftAssign))
  .post(new Resolver(require('@resources/hr/attshiftassign/create'), AttShiftAssign))
  .put(new Resolver(require('@resources/hr/attshiftassign/update'), AttShiftAssign))
  .delete(new Resolver(require('@resources/hr/attshiftassign/delete'), AttShiftAssign))

router.route('/attshift')
  .get(new Resolver(require('@resources/hr/attshift/read'), AttShift))
  .post(new Resolver(require('@resources/hr/attshift/create'), AttShift))
  .put(new Resolver(require('@resources/hr/attshift/update'), AttShift))
  .delete(new Resolver(require('@resources/hr/attshift/delete'), AttShift))

router.route('/attschedule')
  .get(new Resolver(require('@resources/hr/atttimetable/read'), AttSchedule))
  .post(new Resolver(require('@resources/hr/atttimetable/create'), AttSchedule))
  .put(new Resolver(require('@resources/hr/atttimetable/update'), AttSchedule))
  .delete(new Resolver(require('@resources/hr/atttimetable/delete'), AttSchedule))

router.route('/atttype')
  .get(new Resolver(require('@resources/hr/atttype/read'), AttType))
  .post(new Resolver(require('@resources/hr/atttype/create'), AttType))
  .put(new Resolver(require('@resources/hr/atttype/update'), AttType))
  .delete(new Resolver(require('@resources/hr/atttype/delete'), AttType))

router.route('/employee')
  .get(new Resolver(require('@resources/hr/employee/read'), Employee))
  .post(new Resolver(require('@resources/hr/employee/create'), Employee))
  .put(new Resolver(require('@resources/hr/employee/update'), Employee))
  .delete(new Resolver(require('@resources/hr/employee/delete'), Employee))

module.exports = router
