// const { trueType } = require('@app/services/utils')
// const ACTIONS = ['read:any', 'create:any', 'update:any', 'delete:any', 'read:own', 'create:own', 'update:own', 'delete:own']

// module.exports = class BaseResolver {
//   constructor({ authenticate, authorize, action, resource, method, params, field }, defaultResource, methods) {
//     if (authenticate === undefined) authenticate = true
//     if (authorize === undefined) authorize = authenticate

//     if (resource === undefined) resource = defaultResource
    
//     if (action === undefined && authorize) throw new Error('Resolver Action cannot be undefined if Authorization is required' + authenticate + authorize + action)
//     if (action !== undefined && !ACTIONS.includes(action)) throw new Error(`Resolver Action must be one of ${ACTIONS}, got ${action}` )

//     if (trueType(method) !== 'function') throw new Error(`Invalid value for Resolver Method: expected function, got ${method}`)

//     if (params !== undefined && typeof params !== 'function') throw new Error(`Invalid value for resolver Params: expected function, got ${params}`)

//     this.action = action
//     this.authenticate = authenticate
//     this.authorize = authorize
//     this.field = field
//     this.params = params
//     if (resource) this.resource = resource

//     return async (parent, args, context, info) => {
//       let 
//         permission = null,
//         results = null,
//         boundParams = null,
//         { ac, session } = context

        
//       if (this.authorize) {
//         permission = await ac.authorize(session, this.resource,  this.action)
//       }
//       else if (this.authenticate) {
//         await ac.authenticate(session)
//       }
      
//       if (this.field !== undefined && parent[this.field] !== undefined) {
//         results = parent[this.field]
//       }
//       else {
//         let boundParams = this.params === undefined ? [] : this.params(parent, args, context, info)
//         if (trueType(boundParams) !== 'array') boundParams = [boundParams]
        
//         results = await this.method(this.model, ...boundParams)
//       }

//       if (permission !== null) results = permission.filter(results)

//       return results
//     }
//   }
// }



module.exports = class BaseResolver {
  /*
   * @constructor
   * @param {string} action - Action that will be performed. One of ['read:any', 'create:any', 'update:any', 'delete:any', 'read:own', 'create:own', 'update:own', 'delete:own']
   * @param {boolean} authenticate - Whether authentication is required. Defaults to true
   * @param {boolean} authorize - Whether authorization is required. Defaults to same as authenticate param
   * @param {string} field - The field this resolver is for, if the data is already present there it will simply be returned after auth is checked
   * @param {function} method - Will be executed to fetch the data, if the data is not already present on the parent
   * @param {object} model - Objection.js model for this field
   * @param {string} resource - Resource that will be accessed for this request and on which the action will be performed
   */
  constructor (config) {
    let { action, authenticate, authorize, field, method, model, resource } = config

    if (authenticate === undefined) authenticate = true
    if (authorize === undefined) authorize = authenticate
    if (model && resource === undefined) resource = model.resource
    if (action === undefined) action = 'read:any'

    this.config = { action, authenticate, authorize, field, method, model, resource }

    return async (parent, args, context, info) => {
      let
        { ac, session } = context,
        permission = null,
        value = parent[field]

      if (this.config.authorize) {
        permission = await ac.authorize(session, this.config.resource,  this.config.action)
      }
      else if (this.config.authenticate) {
        await ac.authenticate(session)
      }

      if (value === undefined) {
        if (this.config.method !== undefined) {
          value = await this.config.method(this.config.model, { parent, args, context, info })
        }
        else {
          return null
        }
      }
     
      if (permission !== null) {
        if (permission.granted) {
          value = permission.filter(value)
        }
        else {
          console.log('returning unfiltered values as permission has been denied')
        }
      }

      return value
    }
  }
}
