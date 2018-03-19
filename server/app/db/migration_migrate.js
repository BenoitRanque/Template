const m = process.argv[2]
const knex = require('./knex')

if (!m) {
  (async () => {

    for (m of require('../modules')) {
      await knex.migrate.latest(require('./knexfile').migrations(m))
      console.log('Migrated module ', m, ' to latest')
    }

    console.log('Migrated all modules to latest')
    
    knex.destroy()
  })()
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