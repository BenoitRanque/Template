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
      loadExtensions: ['.js'],
      directory: './app/db/migrations/' + m,
      tableName: 'knex_migrations' // storage of knex migrations state
    }
  },
  seeds (m) {
    return {
      loadExtensions: ['.js'],
      directory: './app/db/seeds' + m
    }
  }
}
