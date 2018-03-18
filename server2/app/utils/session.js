import session from 'express-session'
import connectPg from 'connect-pg-simple'
import pg from './pg'
import { COOKIE_SECRET } from '../cfg'

const pgSession = connectPg(session)

export default session({
  store: new pgSession({
    pgPromise : pg,                // Connection
    tableName : 'core_session'   // Use another table-name than the default "session" one
  }),
  secret: COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
})
