module.exports = {
  isEmpty (obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object
  },
  typeOf(obj) {
    return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()
  },
  setDefaults(obj, defaults) {
    Object.keys(defaults).forEach(prop => {
      if (obj[prop] === undefined) obj[prop] = defaults[prop]
    })
    return obj
  }
}