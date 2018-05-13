// register module aliases
require('module-alias/register')

const m = process.argv[2]
const name = process.argv[3]
const { ENV } = require('@config').server
const knex = require('@db/knex')

if (!m) {
  console.error('Module name is a required argument')
}
else if (!require('@app/modules').includes(m)) {
  console.error('Unknown module ', m)
}
else if (!name) {
  console.error('Migration name is a required argument')
}
else {
  knex.migrate.make(name, require('@db/knexfile').migrations(m))
}
