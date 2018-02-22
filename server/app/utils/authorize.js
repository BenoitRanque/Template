import authenticate from './authenticate'

/*
  expected syntax:

  req.user.roles: [{
    privileges: [{
      get
    }]
  }]

*/

export default function(req, res, next) {
  authenticate(req, res, () => {
    const
      method = req.method,
      path = req.path

    if (req.session.user.roles.some(role => {
      return role.privileges.some(privilege => {
        privilege[method.toLowerCase + '_routes'].includes(path)
      })
    })) {
      next()
    }
    else {
      res.status(403).send('Access denied')
    }
  })
}
