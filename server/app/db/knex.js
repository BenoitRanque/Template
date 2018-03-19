const { ENV } = require('../config').server
module.exports = require('knex')(require('./knexfile')[ENV])