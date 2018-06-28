module.exports = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./app/db/ZKTimeNet.db"
  }
})