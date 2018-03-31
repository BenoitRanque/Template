
const express = require('express')

const app = express()

app
  .use(require('@api'))
  .use('/', require('express').static('app/public'))

module.exports = app
