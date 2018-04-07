const { trueType } = require('@app/services/utils')
const ACTIONS = ['read:any', 'create:any', 'update:any', 'delete:any', 'read:own', 'create:own', 'update:own', 'delete:own']

module.exports = class BaseResolver {
  constructor({ authenticate, authorize, action, resource, method, params, }, defaultResource, methods) {
    if (authenticate === undefined) authenticate = true
    if (authorize === undefined) authorize = true

    
    if (action === undefined && authorize) throw new Error('Resolver Action cannot be undefined if Authorization is required')
    if (!ACTIONS.includes(action)) throw new Error(`Resolver Action must be one of ${ACTIONS}` )

    if (resource = undefined) resource = defaultResource

    if (trueType(method) !== 'string') throw new Error(`Invalid value for Resolver Method: expected string, got ${method}`)
    if (methods.hasOwnProperty(method) === false) throw new Error(`Unknown Resolver Method:  ${method} `)

    if (params !== undefined && typeof params !== 'function') throw new Error(`Invalid value for resolver Params: expected function, got ${params}`)

    this.action = action
    this.authenticate = authenticate
    this.authorize = authorize
    this.params = params
    this.resource = resource
    this.method = methods[method]

    return async (parent, args, context, info) => {

      let boundParams = this.params  === undefined ? [] : this.params(parent, args, context, info)

      if (trueType(boundParams) !== 'array') boundParams = [boundParams]

      let permission = null, { ac, session } = context

      if (this.authorize) {
        permission = await ac.authorize(session, this.resource,  this.action)
      }
      else if (this.authenticate) {
        await ac.authenticate(session)
      }

      let results = await this.method(...boundParams)

      if (permission !== null) results = permission.filter(results)

      return results
    }
  }
}
