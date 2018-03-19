const m = process.argv[2]
const knex = require('./knex')

if (!m) {
  let modules = require('../modules').map(md => {
    return knex.migrate.rollback(require('./knexfile').migrations(md))
  })
  Promise.all(modules).then(() => {
    knex.destroy()
    console.log('Rolled back all modules')
  })
}
else {
  if (require('../modules').includes(m)) {
    knex.migrate.rollback(require('./knexfile').migrations(m))
      .then(() => {
        knex.destroy()
        console.log('Rolled back module ', m)
      })
  }
  else {
    console.error('Unknown module ', m)
  }
}