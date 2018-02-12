import pgp from 'pg-promise'
import { PG_NAME, PG_USER, PG_PASS, PG_HOST, PG_PORT } from '../cfg'

// enable require for .sql files
require('require-sql')

const initOptions = {

  // pg-promise initialization options...

  error(err, e) {
    console.error(err)

    if (e.cn) {
      // this is a connection-related error
      // cn = safe connection details passed into the library:
      //      if password is present, it is masked by #
      console.log('this is a connection-related error')
      console.log(e.cn)
    }

    if (e.query) {
      // query string is available
      console.log(e.query)
      if (e.params) {
        // query parameters are available
        console.log(e.params)
      }
    }

    if (e.ctx) {
      // occurred inside a task or transaction
      console.log('occurred inside a task or transaction')
    }
  }
}
const connectOptions = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_NAME,
  user: PG_USER,
  password: PG_PASS
}

const pg = pgp(initOptions)(connectOptions)

export default pg
