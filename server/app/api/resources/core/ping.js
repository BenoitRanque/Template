module.exports = async function ping (input, params, { authenticate }) {
  authenticate()
  console.log('PONG')
  return 'PONG'
}
