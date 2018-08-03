// register module aliases
require('module-alias/register')

const { PORT, HOST } = require('./config').server
const server = require('http').createServer(require('./app'))
console.log(PORT, HOST)

server.listen(PORT, HOST, err => {
  if (err) throw err
  console.log('listening at ' + HOST + ' on port ' + PORT)
})