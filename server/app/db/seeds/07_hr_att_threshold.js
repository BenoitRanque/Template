const AttThreshold = require('@models/hr/AttThreshold')

exports.seed = async function(knex, Promise) {
  const zeroMinutes = new Date()
  const tenMinutes = new Date()
  const twentyMinutes = new Date()

  zeroMinutes.setHours(0, 0, 0, 0)
  tenMinutes.setHours(0, 10, 0, 0)
  twentyMinutes.setHours(0, 20, 0, 0)


  await AttThreshold.query().del()
  await AttThreshold.query().insert({
    start_early: twentyMinutes,
    start_late: tenMinutes,
    end_early: zeroMinutes,
    end_late: twentyMinutes
  })
};
