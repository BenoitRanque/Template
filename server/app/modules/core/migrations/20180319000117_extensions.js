
exports.up = async function(knex, Promise) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto" schema public')
}

exports.down = async function(knex, Promise) {
  await knex.raw('DROP EXTENSION "pgcrypto"')
}
