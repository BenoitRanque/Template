module.exports = async function ping (input, params, { authenticate }) {
  authenticate()
  return 'PONG'
}
