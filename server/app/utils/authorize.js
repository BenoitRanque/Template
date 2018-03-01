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

export default function () {
  return function(req, res, next) {

    // extract route and module from originalUrl
    // expects "/api/[module]/[route]"
    // module can include chars a-z 0-9 _ -
    // route can contain any character

    let [ , module, route] = req.originalUrl.match(/\/api\/([a-z0-9_-]+)\/(.+)/g)

    console.log(module, route, req.method)
    next()
    return
    authenticate(req, res, () => {
      if (req.session.user.roles.some(role => {
        return role.module === module && role.privileges.some(privilege => {
          return privilege[req.method.toLowercase() + '_routes'].includes(route)
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
