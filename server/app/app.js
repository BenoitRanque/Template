const app = require('express')()

require('./db')

require('./modules').forEach(module => {
  app.use('/api', require(`./modules/${module}/routes`))
})

app
  .use('/', require('express').static('app/public'))

module.exports = app
