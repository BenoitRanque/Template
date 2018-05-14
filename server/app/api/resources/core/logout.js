module.exports = async function logout (input, params, { session, authenticate }) {
  authenticate()

  session.destroy()
}
