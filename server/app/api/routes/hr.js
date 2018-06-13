const router = require('express').Router()
const Resolver = require('@tools/resolver')
const { AttBreak, AttDay, AttShiftAssign, AttShift, AttTimetable, Employee } = require('@models/hr')

router.route('/attbreak')
  .get(new Resolver(require('@resources/hr/attbreak/read'), AttBreak))
  .post(new Resolver(require('@resources/hr/attbreak/create'), AttBreak))
  .put(new Resolver(require('@resources/hr/attbreak/update'), AttBreak))
  .delete(new Resolver(require('@resources/hr/attbreak/delete'), AttBreak))

router.route('/attday')
  .get(new Resolver(require('@resources/hr/attday/read'), AttDay))
  .post(new Resolver(require('@resources/hr/attday/create'), AttDay))
  .put(new Resolver(require('@resources/hr/attday/update'), AttDay))
  .delete(new Resolver(require('@resources/hr/attday/delete'), AttDay))

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

router.route('/atttimetable')
  .get(new Resolver(require('@resources/hr/atttimetable/read'), AttTimetable))
  .post(new Resolver(require('@resources/hr/atttimetable/create'), AttTimetable))
  .put(new Resolver(require('@resources/hr/atttimetable/update'), AttTimetable))
  .delete(new Resolver(require('@resources/hr/atttimetable/delete'), AttTimetable))

router.route('/employee')
  .get(new Resolver(require('@resources/hr/employee/read'), Employee))
  .post(new Resolver(require('@resources/hr/employee/create'), Employee))
  .put(new Resolver(require('@resources/hr/employee/update'), Employee))
  .delete(new Resolver(require('@resources/hr/employee/delete'), Employee))

module.exports = router
