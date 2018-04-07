const SessionResolver = require('./resource')

module.exports = {
  session: {
    type: require('./schema'),
    resolver: new SessionResolver('read:own', 'getSession', (parent, args, { session }) => session)
  }
}