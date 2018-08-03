module.exports = {
  server: {
    PORT: process.env.PORT ? Number(process.env.PORT) : 80,
    HOST: process.env.HOST || 'localhost',
    ENV: process.env.NODE_ENV || 'dev'
  },
  db: {
    HOST: process.env.PG_HOST || 'localhost',
    PORT: process.env.PG_PORT ? Number(process.env.PG_PORT) : 5432,
    NAME: process.env.PG_NAME || 'database',
    USER: process.env.PG_USER || 'username',
    PASS: process.env.PG_PASS || 'password',
  },
  session: {
    SECRET: process.env.SESSION_SECRET || 'secret',
    MAXAGE: process.env.SESSION_MAXAGE ? Number(process.env.SESSION_MAXAGE) : 1000 * 60 * 10,  
    PURGE: process.env.SESSION_PURGE ? Number(process.env.SESSION_PURGE) : 1000 * 60 * 5
  },
  bcrypt: {
    SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS === undefined ? Number(process.env.BCRYPT_SALT_ROUNDS) : 12
  },
  dblite: {
    PATH: process.env.SQL_LITE_PATH || "./app/db/ZKTimeNet.db"
  }
}