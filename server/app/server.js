import http from 'http'
import app from './app'
import { PORT, HOST } from './cfg'

const server = http.createServer(app)

server.listen(PORT, HOST, err => {
  if (err) throw err
  console.log('listening at ' + HOST + ' on port ' + PORT)
})