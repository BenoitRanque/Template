// Object.toType = (function toType(global) {
//   return function(obj) {
//     if (obj === global) {
//       return "global";
//     }
//     return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
//   }
// })(this)

// const v = {
//   validate (obj, schema) {
//     // verify schema
//     // for each prop in object: check if instance of v. if so run check
//     if (prop instanceof this) {
//       prop.validate(obj.prop)
//     }
//   },
//   init () {
//     this = new this()
//   },
//   constructor () {

//   },
//   string () {
//     if (!this.validations) this.init()
//     this.validations.push(prop => trueType(prop) === 'string')
//     return this
//     // prop is string
//   },
//   required (prop) {
//     this.validations.push(prop => prop !== undefined)
//     // prop is required
//   }
// }

// class V {
//   constructor () {
    
//   }

//   init() {
//     if (!this.validations) this.validations = []
//   }

//   string() {
//     this.init()
//     this.validations.push(prop => typeof prop === 'string')
//   }

//   string() {
//     this.init()
//     this.validations.push(prop => typeof prop === 'string')
//   }

// }

// function V () {
//   this.init = () => {
//     this = new V()
//     this.validations = []
//   }

//   this.string = () => {
//     if (!this.validations) this.init()

//     this.validations.push(prop => typeof prop === 'string')

//     return this
//   }
// }

// v.validate(obj, {
//   prop1: v.string().required(),
//   prop2: {
//     prop3: v.required().array(),
//     prop4: v.required().object()
//   }
// })


// class v {
//   static __type(obj) {
//     return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()
//   }
//   static validate (obj, schema) {
//     if (schema instanceof this.Validator) {
//       for (let validation of schema.validations) {
//         if (!validation(obj)) {
//           // error code here
//           throw new Error('validation failed')
//         }
//       }
//       if (schema.schema) {
//         this.validate(schema.schema, obj)
//       }
//     }
//     else {
//       let type = this.__type(schema)
//       switch (type) {
//         case 'object':
//           for (let key in schema)
//           this.validate(obj[key], schema[key])
//           break

//         case 'array':
//           for (let index of obj)
//           this.validate(obj[key], schema[0])
//           break

//         default:
//           throw new Error(`Unknown type ${type}`)
//       }
//     }
//   }
//   static field () {
//     return new this.Validator()
//   }

//   static get Validator() {
//     return class Validator {
//       constructor () {
//         this.validations = []
//         this.schema = null
//       }
  
//       required () {
//         this.validations.push(field => field !== undefined)
//         return this
//       }
  
//       string () {
//         this.validations.push(field => field === undefined ? true : v.type(field) === 'string')
//         return this
//       }
  
//       object () {
//         this.validations.push(field => field === undefined ? true : v.type(field) === 'object')
//         return this
//       }
  
//       instanceOf(schema) {
//         this.schema = schema
//         return this
//       }
  
//       custom (validation) {
//         this.validations.push(validation)
//         return this
//       }
//     }
//   }
// }

// let schema = {
//   session: v.field().required().object(),
//   body: {
//     username: v.field().required().string(),
//     password: v.field().required().string(),
//   }
// }

// v.validate({
//   session: {
//     user: null
//   },
//   user: {
//     username: 'admin',
//     password: ''
//   }
// }, schema)


// class BaseResolver {
//   constructor(action, promise, params) {
//     this.action = action
//     if (!this.constructor.hasOwnProperty(promise)) throw new Error(`Unknown Promise ${promise} in resolver`)
//     this.promise = this.constructor[promise]

//     return async (parent, args, context, info) => {
//       let boundParams = params === undefined ? {} : params(parent, args, context, info)

//       let permission = null, { ac, session } = context

//       if (action !== null) {
//         permission = await ac.authorize(session, action, this.resource)

//         if (!permission.granted) {
//           throw new Error (`Acess to resource ${this.resource} denied`)
//         }
//       }

//       let results = await this.promise(...boundParams)

//       if (permission !== null) {
//         results = permission.filter(results)
//       }

//       return results
//     }
//   }
// }

// class UserResolver extends BaseResolver {
//   constructor (action, promise, params) {
//     super (action, promise, params)
//     this.resource = 'core_User'
//   }

//   static async ['hello'] (message) {
//     console.log(message)
//     return message
//   }
// }

// let handler = new UserResolver(null, 'helo', (message) => ([ message ]))

// handler('a message', {}, { ac: null, session: null })

// (function({arg1, arg2}) {
//   console.log({ arg1, [arg2 ? arg2 : undefined]: arg2 })
// })({ arg1: 'hi' })




// let auth = await new Promise((resolve, reject) => gapi.auth2.authorize(config, function callback (err, response) => {
//   if (err) return reject(err)
//   resolve(response)
// }))

// auth = whatever gapi.auth2.authorizes passed to it's callback


// class BaseResolver {
//   init (options) {

//   }
// }

// class UserResolver {
//   constructor () {
//     this.TABLE = 'core_users'
//   }

//   getUser: where => knex.
// }