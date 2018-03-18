module.exports = function (knex, m) {
  require(`../modules/${m}/tables`).forEach(table => {
    knex.schema.hasTable(table).then(exists => {
      console.log('Table ', table, ' exists ', exists)
      if (!exists) require(`../modules/${m}/tables/${table}`)(knex)
    })
  })
}