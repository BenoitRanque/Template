let m = process.argv[2]
const knex = require('./knex')

if (!m) {
  (async () => {
    try {

      for (m of require('../modules')) {
        await knex.migrate.latest(require('./knexfile').migrations(m))
        console.log('Migrated module ', m, ' to latest')
      }

      console.log('Migrated all modules to latest')

    } catch (error) {
      console.log(error)
    }

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
    .catch(error => {
      console.log(error)
      knex.destroy()
    })
  }
  else {
    console.error('Unknown module ', m)
  }
}