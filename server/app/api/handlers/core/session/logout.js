const authenticate = require('../../services/authenticate')
module.exports = [
  authenticate,
  function logout (req, res) {
    req.session.destroy()
    res.status(200).end()
  }
]
