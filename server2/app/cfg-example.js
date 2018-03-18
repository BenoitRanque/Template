  /*

  cfg.js example
  ====================================

  copy this file and name the copy cfg.js
  put all sensitive data here, as is will be ignored by github

  */

const
  PORT = process.env.PORT || 80,
  HOST = process.env.HOST || 'localhost',
  ENV = process.env.NODE_ENV || 'dev',

  PG_HOST = process.env.PG_HOST || 'localhost',
  PG_PORT = process.env.PG_PORT || 5432,
  PG_NAME = process.env.PG_NAME || 'database_name',
  PG_USER = process.env.PG_USER || 'database_user',
  PG_PASS = process.env.PG_PASS || 'database_password',

  COOKIE_SECRET = process.env.COOKIE_SECRET || 'secret',

  BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || 12

export {
  PORT,
  HOST,
  ENV,
  PG_HOST,
  PG_PORT,
  PG_NAME,
  PG_USER,
  PG_PASS,
  COOKIE_SECRET,
  BCRYPT_SALT_ROUNDS
}
