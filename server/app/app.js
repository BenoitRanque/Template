
const express = require('express')

const app = express()

require('./db')

require('./modules').forEach(m => {
  app.use('/api', express.json(), require(`./modules/${m}/routes`))
})

app
  .use('/', require('express').static('app/public'))

module.exports = app
