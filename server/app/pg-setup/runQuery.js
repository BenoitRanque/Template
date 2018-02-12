import pgp from 'pg-promise'
import { PG_NAME, PG_USER, PG_PASS, PG_HOST, PG_PORT } from '../cfg'

// enable require for .sql files
require('require-sql')

const initOptions = {}
const connectOptions = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_NAME,
  user: PG_USER,
  password: PG_PASS
}

const db = pgp(initOptions)(connectOptions)

export default function runQuery ( queryName, values, callback ) {
  let query = require(`./queries/${queryName}.sql`)

  if (!query) {
    console.error(`Query ${queryName} not found`)
    return
  }
  db
    .any(query, values)
    .then(response => {
      console.log(response)
      if (callback !== undefined ) { callback() }
    })
    .catch(error => {
      console.error(error)
      if (callback !== undefined ) { callback() }
    })
}