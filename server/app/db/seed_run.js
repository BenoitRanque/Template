let m = process.argv[2]
const knex = require('./knex')

if (!m) {
  (async () => {
    try {

      for (m of require('../modules')) {
        await knex.seed.run(require('./knexfile').seeds(m))
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
  if (require('../modules').includes(m)) {
    knex.seed.run(require('./knexfile').seeds(m))
    .then(() => {
      knex.destroy()
      console.log('Ran seed for module ', m)
    })
    .catch(error => {
      console.log(error)
    })
  }
  else {
    console.error('Unknown module ', m)
  }
}