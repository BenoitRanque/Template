module.exports = function authorize ({ resource, action, possesion }) {
  // possible values for action:
  // 'read'
  // 'create'
  // 'update'
  // 'delete'

  // posible values for posesion
  // 'any'
  // 'own'
  return async (req, res, next) => {
    require('./authenticate')(req, res, () => {
      require('./access_control')()(req, res, () => {

        // role = req.user.role
        role = ['admin', 'guest'] // todo: get these from user session

        req.permission = req.ac.permission({ role, resource, action, possesion })

        if (req.permission.granted) {
          console.log('permission granted')
          next()
        }
        else {
          console.log('permission denied')
          next()
        }
      })
    })
  }
}