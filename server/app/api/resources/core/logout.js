module.exports = async function logout (input, params, { session }) {
  session.destroy()
}
