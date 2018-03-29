// register module aliases
require('module-alias/register')

let m = process.argv[2]
const knex = require('@db/knex')

if (!m) {
  (async () => {
    try {

      for (m of require('@app/modules')) {
        await knex.migrate.latest(require('@db/knexfile').migrations(m))
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
  if (require('@app/modules').includes(m)) {
    knex.migrate.latest(require('@db/knexfile').migrations(m))
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