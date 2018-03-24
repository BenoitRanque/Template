module.exports = {
  SECRET: process.env.COOKIE_SECRET || 'secret',
  MAXAGE: process.env.COOKIE_MAXAGE || 1000 * 60 * 10              // 10 minutes
  // MAXAGE: process.env.COOKIE_MAXAGE || 1000 * 60 * 30              // 30 minutes
  // MAXAGE: process.env.COOKIE_MAXAGE || 1000 * 60 * 60 * 2          // 2 hours
  // MAXAGE: process.env.COOKIE_MAXAGE || 1000 * 60 * 60 * 24 * 1     // 1 day hours
}