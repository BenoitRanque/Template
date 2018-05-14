const atob = require('atob')
const btoa = require('btoa')

module.exports = {
  encode (data) {
    return encodeURI(btoa(JSON.stringify(data)))
  },
  decode (data) {
    return JSON.parse(atob(decodeURI(data)))
  }
}
