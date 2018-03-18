export default function authenticate(req, res, next) {
  if (req.session.user) {
    next()
  }
  else {
    res.status(401).send('Authentication Required')
  }
}
