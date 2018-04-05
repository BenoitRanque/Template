module.exports = {
  isEmpty (obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object
  },
  trueType(obj) {
    return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()
  }
}