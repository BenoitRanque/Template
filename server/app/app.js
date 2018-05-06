
const express = require('express')

const app = express()

app
  .use(require('@api/v1'))
  // .use(require('@api/graphql'))
  .use('/', require('express').static('app/public'))


// app.get('/counter', function(req, res, next) {
//   if (req.session.views) {
//     req.session.views++
//     res.setHeader('Content-Type', 'text/html')
//     res.write('<p>views: ' + req.session.views + '</p>')
//     res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
//     res.end()
//   } else {
//     req.session.views = 1
//     res.end('welcome to the session demo. refresh!')
//   }
// })

module.exports = app
