module.exports = fucntion (req, res) {
  // check auth

  require('./access_control')(true) // update user roles
}