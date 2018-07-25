const ServerError = require('@tools/serverError.js')

module.exports = function validateSchedule (schedule) {
  const totalValue = 
    schedule.uptime.reduce((acc, val) => val.type_id === ATT_WORK ? acc + Number(val.value) : acc, 0) +
    schedule.downtime.reduce((acc, val) => acc + Number(val.value), 0)

  if (totalValue !== 1) throw new ServerError(400, `Validation Error: Total schedule value must be equal to 1, is ${totalValue}`)
}