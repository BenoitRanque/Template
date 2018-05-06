module.exports = {
  isEmpty (obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object
  },
  type(obj) {
    return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()
  },
  setDefaults(obj, defaults) {
    Object.keys(defaults).forEach(prop => {
      if (obj[prop] === undefined) obj[prop] = defaults[prop]
    })
    return obj
  },
  encode (data) {
    return encodeURI(btoa(JSON.stringify(data)))
  },
  decode (data) {
    return JSON.parse(atob(decodeURI(data)))
  }
}