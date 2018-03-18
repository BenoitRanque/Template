const hasTables = require('./hasTables.js')

module.exports = function (knex) {
  require('../modules').forEach(m => {
    hasTables(knex, m)
  })
}