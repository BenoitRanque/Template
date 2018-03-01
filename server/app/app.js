import express from 'express'
import bodyParser from 'body-parser'
import api from './api'
import headers  from './utils/headers'
import pg from './utils/pg'
import session from './utils/session'

const app = express()

app.request.pg = pg

app
  .use(headers)
  .use(session)
  .use('/api', bodyParser.json(), api)
  .use('/', express.static('app/public'))

export default app