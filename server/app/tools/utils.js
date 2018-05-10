const atob = require('atob')
const btoa = require('btoa')

module.exports = {
  encode (data) {
    return encodeURI(btoa(JSON.stringify(data)))
  },
  decode (data) {
    return JSON.parse(atob(decodeURI(data)))
  },
  HTTPmethodToAction (method) {
    switch (method) {
      case 'GET': return 'read'
      case 'POST': return 'create'
      case 'PUT': return 'update'
      case 'DELETE': return 'delete'
      default: throw new Error(`Unsuported HTTP method ${method}`)
    }
  }
}
