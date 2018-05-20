// register module aliases
require('module-alias/register')

const { HOST, PORT, NAME, USER, PASS } = require('@config').db

module.exports = {
  dev: {
    client: 'pg',
    // debug: true,
    // connection: 'postgres://guembe_owner:guembe@localhost:5432/guembe'
    connection: {
      host: HOST,
      port: PORT,
      database: NAME,
      user: USER,
      password: PASS
    },
      // paths relative to server folder, location of npm scripts
    migrations: {
      loadExtensions: ['.js'],
      directory: './app/db/migrations',
      tableName: 'knex_migrations' // storage of knex migrations state
    },
    seeds: {
      loadExtensions: ['.js'],
      directory: './app/db/seeds'
    }
  },
  prod: {
    client: 'pg',
    connection: {
      host: HOST,
      port: PORT,
      database: NAME,
      user: USER,
      password: PASS
    },
    // paths relative to server folder, location of npm scripts
    migrations: {
      loadExtensions: ['.js'],
      directory: './app/db/migrations',
      tableName: 'knex_migrations' // storage of knex migrations state
    },
    seeds: {
      loadExtensions: ['.js'],
      directory: './app/db/seeds'
    }
  },
  // aliases
  get production () {
    return this.prod
  },
  get development () {
    return this.dev
  },
}
