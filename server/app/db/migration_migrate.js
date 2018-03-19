const m = process.argv[2]
const knex = require('./knex')

if (!m) {
  let modules = require('../modules').map(md => {
    return knex.migrate.latest(require('./knexfile').migrations(md))
  })
  Promise.all(modules).then(() => {
    knex.destroy()
    console.log('Migrated all modules to latest')
  })
}
else {
  if (require('../modules').includes(m)) {
    knex.migrate.latest(require('./knexfile').migrations(m))
    .then(() => {
      console.log('Migrated module ', m, ' to latest')
      knex.destroy()
    })
  }
  else {
    console.error('Unknown module ', m)
  }
}