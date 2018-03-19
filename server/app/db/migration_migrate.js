const m = process.argv[2]
const knex = require('./knex')

if (!m) {
  require('../modules').forEach(async md => {
    await knex.migrate.latest(require('./knexfile').migrations(md))
    console.log('Migrated module ', md, ' to latest')
  })
}
else {
  if (require('../modules').includes(m)) {
    knex.migrate.latest(require('./knexfile').migrations(m))
    .then(() => {
      console.log('Migrated module ', m, ' to latest')
    })
  }
  else {
    console.error('Unknown module ', m)
  }
}