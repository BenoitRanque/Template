const { HOST, PORT, NAME, USER, PASS } = require('../config').db

module.exports = {
  dev: {
    client: 'pg',
    connection: {
      host: HOST,
      port: PORT,
      database: NAME,
      user: USER,
      password: PASS
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
    }
  },
  // paths relative to server folder, location of npm scripts
  migrations (m) {
    return {
      directory: './app/modules/' + m  + '/migrations',
      tableName: 'knex_migrations' // storage of knex migrations state
    }
  },
  seeds (m) {
    return {
      directory: './app/modules/' + m  + '/seeds'
    }
  }
}
