// register module aliases
require('dotenv/config')
require('module-alias/register')

// simple map to actual knexfile
module.exports = require('@db/knexfile')
