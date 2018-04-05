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

module.exports = class BaseResolver {
  constructor(action, promise, params, resource, promises) {
    if (typeof promise !== 'string') throw new Error(`Invalid value for promise argument: expected string, got ${promise}`)
    if (promises.hasOwnProperty(promise) === false) throw new Error(`Unknown Promise in resolver:  ${promise} `)
    if (params !== undefined && typeof params !== 'function') throw new Error(`Invalid value for params argument: expected function, got ${params}`)

    return async (parent, args, context, info) => {
      let boundParams = params === undefined ? {} : params(parent, args, context, info)

      let permission = null, { ac, session } = context

      if (action !== null) permission = await ac.authorize(session, resource, action)

      let results = await promises[promise](...boundParams)

      if (permission !== null) results = permission.filter(results)

      return results
    }
  }
}
