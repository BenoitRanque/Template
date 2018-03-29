// register module aliases
require('module-alias/register')

let m = process.argv[2]
const knex = require('@db/knex')

if (!m) {
  (async () => {
    try {

      for (m of require('@app/modules')) {
        await knex.migrate.rollback(require('@db/knexfile').migrations(m))
        console.log('Rolled back module ', m)
      }

      console.log('Rolled back all modules')

    } catch (error) {
      console.log(error)
    }

    knex.destroy()
  })()
}
else {
  if (require('@app/modules').includes(m)) {
    knex.migrate.rollback(require('@db/knexfile').migrations(m))
      .then(() => {
        knex.destroy()
        console.log('Rolled back module ', m)
      })
      .catch(error => {
        console.log(error)
      })
  }
  else {
    console.error('Unknown module ', m)
  }
}