/*
 * BASE RESOLVER
 *
 * Class to generate resolvers for graphql
 *
 * Constructor arguments:
 *
 * action: a valid accesscontrol action:ownership string
 * if ommited, access control will not be checked
 * see: https://onury.io/accesscontrol/?api=ac
 *
 * promise: a string identifying a promise available on the constructor
 * Example Usage:
 *

class ExtendedResolver extends BaseResolver {
  // this constructor is mandatory
  constructor (action, promise, params) {
    super (action, promise, params)
    this.resource = 'core_User'
  }

  // list of available promises
  static async ['hello'] (message) {
    console.log(message)
    return message
  }
}

const resolver = new ExtendedResolver('get:own', 'hello', (parent, args, context, info) => ([parent, args]))

 *
 */

const { trueType } = require('@app/services/utils')


module.exports = class BaseResolver {
  constructor(action, method, params, resource, methods) {
    if (trueType(method) !== 'string') throw new Error(`Invalid value for Method argument: expected string, got ${method}`)
    if (methods.hasOwnProperty(method) === false) throw new Error(`Unknown Method in resolver:  ${method} `)
    if (params !== undefined && typeof params !== 'function') throw new Error(`Invalid value for Params argument: expected function, got ${params}`)

    this.action = action
    this.params = params
    this.resource = resource
    this.method = methods[method]

    return async (parent, args, context, info) => {

      let boundParams = this.params  === undefined ? [] : this.params(parent, args, context, info)

      if (trueType(boundParams) !== 'array') boundParams = [boundParams]

      let permission = null, { ac, session } = context

      if (this.action !== null) permission = await ac.authorize(session, this.resource,  this.action)

      let results = await this.method(...boundParams)

      if (permission !== null) results = permission.filter(results)

      return results
    }
  }
}
