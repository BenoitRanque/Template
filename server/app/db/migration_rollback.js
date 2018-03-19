const m = process.argv[2]
const knex = require('./knex')

if (!m) {
  require('../modules').forEach(async md => {
    await knex.migrate.rollback(require('./knexfile').migrations(md))
    console.log('Rolled back module ', md)
  })
}
else {
  if (require('../modules').includes(m)) {
    knex.migrate.rollback(require('./knexfile').migrations(m))
    .then(() => {
      console.log('Rolled back module ', m)
    })
  }
  else {
    console.error('Unknown module ', m)
  }
}