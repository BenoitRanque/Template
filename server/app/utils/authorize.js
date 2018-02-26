import authenticate from './authenticate'

/*
  expected syntax:

  req.user.roles: [{
    name: 'admin',
    module: 'core',
    privileges: [{
      get_routes: ['string/value'],
      post_routes: ['string/value'],
      put_routes: ['string/value'],
      delete_routes: ['string/value']
    }]
  }]

*/

export default function ({ module, route, method }) {
  return function(req, res, next) {
    authenticate(req, res, () => {
      if (req.session.user.roles.some(role => {
        return role.module === module && role.privileges.some(privilege => {
          return privilege[method + '_routes'].includes(route)
        })
      })) {
        next()
      }
      else {
        res.status(403).send('Access denied')
      }
    })
  }
}
