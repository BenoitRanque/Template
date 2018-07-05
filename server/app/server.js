// register module aliases
require('module-alias/register')


const { PORT, HOST } = require('./config').server
console.log('port', PORT)
const server = require('http').createServer(require('./app'))

server.listen(PORT, HOST, err => {
  if (err) throw err
  console.log('listening at ' + HOST + ' on port ' + PORT)
})