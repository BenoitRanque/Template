const recursiveFilter = require('./recursiveFilter')
const { encode, decode, HTTPmethodToAction } = require('./utils')

module.exports = class Resolver {
  constructor (method, params) {
    this.method = method
    this.params = params ? params : () => {} 

    return async (req, res, next) => {
      try {
        let { accessControl, session, body, query, method } = req
        let { possession, filters, fields } = query

        let action = HTTPmethodToAction(method)

        let info = {
          action: HTTPmethodToAction(method),
          possession: possession ? possession : 'any',
          session,
          fields: fields ? decode(fields) : [],
          filters: filters ? decode(filters) : {}
        }
        let tools = {
          accessControl,
          authenticate: () => accessControl.authenticate(session),
          authorize: (resource, action, possession) => accessControl.authorize(session, resource, action || info.action, possession || info.possession),
          permission: (resource, action, possession) => accessControl.permission(session, resource, action || info.action, possession || info.possession),
          recursiveFilter: (model, data, action, possession) => recursiveFilter(model, accessControl, data, action || info.action, possession || info.possession),
          encode,
          decode
        }

        let input = body

        let params = this.params(req, res, next)

        let output = await this.method(info, tools, input, params)

        res.status(200).json(output)
      }
      catch (error) {
        console.log(error)
        res.status(500).end(error)
      }
    }
  }
}
