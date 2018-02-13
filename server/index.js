require('babel-register')
require('./app/' + process.argv[2] || 'server')