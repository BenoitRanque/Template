
const session = require('express-session')
// const KnexSessionStore = require('connect-session-knex')(session)
// const knex = require('@db/knex')

const { SECRET, MAXAGE, PURGE } = require('@config').session

// const store = new KnexSessionStore({
//     knex: knex,
//     tablename: 'core_user_sessions' // optional. Defaults to 'sessions'
// })

const Session = require('@models/core/Session')

const Store = session.Store || session.session.Store

class SessionStore extends Store {
  async all (callback) {
    try {
      let sessions = await Session.query()
      callback (undefined, sessions)
    } catch (error) {
      callback(error)
    }
  }

  async destroy(session_id, callback) {
    try {
      await Session.query().where({ session_id }).del()
    } catch (error) {
      callback(error)
    }
  }

  async clear(callback) {
    try {
      await Session.query().del()
    } catch (error) {
      callback(error)
    }
  }

  async length(callback) {
    try {
      let length = await Session.query().count('session_id')
      callback(undefined, Number(length))
    } catch (error) {
      callback(error)
    }
  }

  async get (session_id, callback) {
    try {
      let session = await Session.query().where({ session_id }).first()
      if (!session) return callback(undefined, null)
      callback(undefined, session.data)
    } catch (error) {
      callback(error)
    }
  }

  async set (session_id, data, callback) {
    try {
      let session = await Session.query()
        .where({ session_id })
        .andWhere('expires', '>', new Date().toISOString())
        .patch({ data, expires: data.cookie.expires.toISOString() })
        .catch(() => {})
      || await Session.query()
        .insert({ session_id, data, user_id: data.user.user_id, expires: data.cookie.expires.toISOString()  })

      callback()
    } catch (error) {
      callback(error)
    }
  }

  async destroy (session_id, callback) {
    console.log('destroying session')
    try {
      await Session.query().where({ session_id }).del()
      callback && callback()
    } catch (error) {
      callback && callback(error)
    }
  }

  async touch (session_id, data, callback) {
    try {
      console.log('Touching session')
      await Session.query().where({ session_id }).andWhere('expires', '>', new Date().toISOString()).patch({ expires: data.cookie.expires.toISOString() })
      callback()
    } catch (error) {
      callback(error)
    }
  }

  async purge () {
    await Session.query().where('expires', '<', new Date().toISOString()).del()
    console.log('PURGING SESSIONS')
  }
}

const store = new SessionStore()

setInterval(() => {
  store.purge()
}, PURGE)

module.exports = session({
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
      httpOnly: true,
      maxAge: MAXAGE,
    //   domain: 'http://localhost:80'
  },
  store
})
