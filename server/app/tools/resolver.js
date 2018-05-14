// const recursiveFilter = require('./recursiveFilter')
const ServerError = require('./serverError')
const { encode, decode } = require('./utils')

module.exports = class Resolver {
  constructor (method, model, params) {
    this.model = model
    this.method = method
    this.params = params ? params : req => req.query

    return async (req, res, next) => {
      try {
        let { accessControl, session, body } = req

        let input = body || {}

        let params = this.params(req, res, next) || {}

        let context = {
          model: this.model,
          ServerError,
          session,
          accessControl,
          authenticate: () => accessControl.authenticate(session),
          authorize: (resource, action, possession) => accessControl.authorize(session, resource, action || info.action, possession || info.possession),
          // permission: (resource, action, possession) => accessControl.permission(session, resource, action || info.action, possession || info.possession),
          // recursiveFilter: (model, data, action, possession) => recursiveFilter(model, accessControl.permission, session, data, action || info.action, possession || info.possession),
          encode,
          decode
        }

        let output = await this.method(input, params, context)

        res.status(200).json(output)
      }
      catch (error) {
        if (error instanceof ServerError) {
          res.status(error.statusCode).end(error.message)
        }
        else {
          console.log(error)
          res.status(500).end()
        }
      }
    }
  }
}
