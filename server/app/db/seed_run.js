const m = process.argv[2]
const knex = require('./knex')

if (!m) {
  require('../modules').forEach(async md => {
    await knex.seed.run(require('./knexfile').seeds(md))
    console.log('Ran seed for module ', md)
  })
}
else {
  if (require('../modules').includes(m)) {
    knex.seed.run(require('./knexfile').seeds(m))
    .then(() => {
      console.log('Ran seed for module ', m)
    })
  }
  else {
    console.error('Unknown module ', m)
  }
}