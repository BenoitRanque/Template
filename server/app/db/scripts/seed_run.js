// register module aliases
require('module-alias/register')

let m = process.argv[2]
const knex = require('@db/knex')

if (!m) {
  (async () => {
    try {

      for (m of require('@app/modules')) {
        await knex.seed.run(require('@db/knexfile').seeds(m))
        console.log('Ran seed for module ', m)
      }

      console.log('Ran seed for all module')

    } catch (error) {
      console.log(error)
    }

    knex.destroy()
  })()
}
else {
  if (require('@app/modules').includes(m)) {
    knex.seed.run(require('@db/knexfile').seeds(m))
    .then(() => {
      knex.destroy()
      console.log('Ran seed for module ', m)
    })
    .catch(error => {
      knex.destroy()
      console.log(error)
    })
  }
  else {
    console.error('Unknown module ', m)
  }
}