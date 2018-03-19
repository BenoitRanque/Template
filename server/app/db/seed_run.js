const m = process.argv[2]
const knex = require('./knex')

if (!m) {
  let modules = require('../modules').map(md => {
    return knex.seed.run(require('./knexfile').seeds(m))
  })
  Promise.all(modules).then(() => {
    knex.destroy()
    console.log('Ran seed for all module')
  })
}
else {
  if (require('../modules').includes(m)) {
    knex.seed.run(require('./knexfile').seeds(m))
    .then(() => {
      knex.destroy()
      console.log('Ran seed for module ', m)
    })
  }
  else {
    console.error('Unknown module ', m)
  }
}