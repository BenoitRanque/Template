const { PATH } = require('@config').dblite

module.exports = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: PATH
  }
})