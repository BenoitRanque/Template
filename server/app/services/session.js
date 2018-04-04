
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session)
const knex = require('@db/knex')

const { SECRET, MAXAGE } = require('@config').cookie

const store = new KnexSessionStore({
    knex: knex,
    tablename: 'core_user_sessions' // optional. Defaults to 'sessions'
})

module.exports = session({
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: MAXAGE,
      domain: 'http://localhost:8080'
  },
  store
})
