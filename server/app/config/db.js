module.exports = {
  HOST: process.env.PG_HOST || 'localhost',
  PORT: process.env.PG_PORT || 5432,
  NAME: process.env.PG_NAME || 'guembe',
  USER: process.env.PG_USER || 'guembe_owner',
  PASS: process.env.PG_PASS || 'guembe',
}
