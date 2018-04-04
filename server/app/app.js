
const express = require('express')

const app = express()

app
  // .use(require('@api'))
  .use(require('./services/session'))
  .use(require('./graphql'))
  .use('/', require('express').static('app/public'))

module.exports = app
