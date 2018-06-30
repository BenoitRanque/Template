const format = require('date-fns/format')
const parse = require('date-fns/parse')

module.exports.formatDate = date => format(date, 'YYYY-MM-DD')
module.exports.formatTime = date => format(date, 'HH:mm:ss')

module.exports.parseDate = date => parse(date).toISOString()
// module.exports.parseTime = date => parse(date).toISOString()
module.exports.parseTime = date => {
  let d = new Date()
  let [t, h, m, s] = date.match(/(\d?\d):(\d\d):(\d\d)/)
  d.setHours(Number(h), Number(m), Number(s), 0)
  return d.toISOString()
}
module.exports.parseInterval = date => {
  let d = new Date()
  d.setHours(date.hours ? date.hours : 0, date.minutes ? date.minutes : 0, date.seconds ? date.seconds : 0, 0)
  return d.toISOString()
}

