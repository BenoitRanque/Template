const { HOST, PORT, NAME, USER, PASS } = require('../config').db

module.exports = require('knex')({
  client: 'pg',
  connection: {
    host: HOST,
    port: PORT,
    database: NAME,
    user: USER,
    password: PASS
  }
})
