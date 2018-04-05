// register module aliases
require('module-alias/register')

const m = process.argv[2]
const name = process.argv[3]
const { ENV } = require('../config').server
const knex = require('./knex')

if (!m) {
  console.error('Module name is a required argument')
}
else if (!require('@app/modules').includes(m)) {
  console.error('Unknown module ', m)
}
else if (!name) {
  console.error('Seed name is a required argument')
}
else {
  knex.seed.make(name, require('@db/knexfile').seeds(m))
}