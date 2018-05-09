module.exports = async function logout ({ session }, { authenticate }, data, params) {
  authenticate()

  session.destroy()
}
