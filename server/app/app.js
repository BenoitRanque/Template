const { ENV } = require('@config').server
const express = require('express')
const app = express()

app.use((req, res, next) => {
  console.log(req.method.toUpperCase(), req.path)

  if (ENV === 'dev' && req.get('origin')) {
    res.setHeader('Access-Control-Allow-Origin', req.get('origin'))
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  next()
})

app
  .use(require('@api'))
  .use('/', require('express').static('app/public'))

module.exports = app
