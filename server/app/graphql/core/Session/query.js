const SessionResolver = require('./resource')

module.exports = {
  session: {
    type: require('./schema'),
    resolve: new SessionResolver({
      action: 'read:own',
      method: 'getSession',
      params:  (parent, args, { session }) => session
    })
  }
}