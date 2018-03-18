const knex  = require('./connection')

require('./init')(knex)

module.exports = knex