module.exports = async function logout (req, res) {
  req.session.destroy()
  res.status(200).end()
}