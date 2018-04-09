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
// class Parent {
//   constructor (options) {
//     this.stuffa = 'a'
//     this.stuffb = 'b'
//   }
// }

// class Child extends Parent {
//   constructor (options) {
//     super(options)
//     this.stuffc = 'c'
//   }
// }

// register module aliases
require('module-alias/register')

const { Model } = require('objection')
const knex = require('@db/knex')
Model.knex(knex)

const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLEnumType, GraphQLInputObjectType } = require('graphql')

function toGraphQLType (type) {
  switch (type) {
    case 'string': return GraphQLString
    case 'integer': return GraphQLInt
    case 'number': return GraphQLString
    case 'number': return GraphQLString
      
      break;
  
    default:
      throw new Error(`Unknow data Type ${type}`)
  }
}

function toGraphQLResolver({ relation, modelClass, join }) {
  switch (relation) {
    case Model.BelongsToOneRelation: return new Resolver({
      
    })
    case Model.HasOneRelation: return new Resolver({

    })
    case Model.HasManyRelation: return new Resolver({

    })
  }
}

class BaseModel extends Model {

  static initGraphQLType({ includeFields, excludeFields }, isInputType) {
    let fields = {}
    // map fields
    Object.keys(this.jsonSchema.properties).forEach(field => {
      fields[field] = { 
        type: toGraphQLType(field)
      }
    })
    // map relations
    Object.keys(this.relationMappings).forEach(field => {
      if (fields[field] !== undefined) throw new Error(`Relation ${field} already listed as field in model ${this.jsonSchema.name}`)
      
      fields[field] = {
        type: this.relationMappings[field].modelClass.getGraphQLType(),
        resolver: 
      }
    })
    
    // map required
    if (this.jsonSchema.required) this.jsonSchema.required.forEach(requiredField => {
      if (!this.fields[requiredField]) throw new Error(`Unknown required field ${requiredField} in model ${this.jsonSchema.name}`)
      this.fields[requiredField].type = new GraphQLNonNull(this.fields[requiredField].type )
    })

    
    let options = {
      name: this.jsonSchema.name + (isInputType ? 'Input' : ''),
      description: this.jsonSchema.description,
      fields: () => fields
    }

    if (isInputType) {
      this.GraphQLInputType = new GraphQLInputObjectType(options)
      return this.GraphQLInputType
    }
    else {
      this.GraphQLType = new GraphQLObjectType(options)
      return this.GraphQLType
    }
  }

  static getGraphQLType (options) {
    return this.GraphQLType ? this.GraphQLType : this.initGraphQLType(options)
  }

  static getGraphQLInputType (options) {
    return this.GraphQLInputType ? this.GraphQLInputType : this.initGraphQLType(options, true)
  }
}

class PrivilegeAttributes  extends BaseModel {

  static get Resolver() {
    return class PrivilegeAttributesResolver extends BaseResolver {

    }
  }

  static get tableName() {
    return 'core_privilege_attributes'
  }

  static get idColumn() {
    return ['privilege_id', 'attribute']
  }
  static get relationMappings() {
    return {
      privilege: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Privilege,
        join: {
          from: 'core_privilege_attributes.privilege_id',
          to: 'core_privileges.privilege_id'
        }
      }
    }
  }
}

class Privilege extends BaseModel {
  static get tableName() {
    return 'core_privileges'
  }
  static get idColumn() {
    return 'privilege_id'
  }

  static get jsonSchema () {
    return {
      name: 'CorePrivilege',
      resource: 'core_Privilege',
      description: 'A privilege of the core module',
      type: 'object',
      required: ['privilege_id'],

      properties: {
        privilege_id: {
          type: 'string'
        },
        privilege_name: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        module_id: {
          type: 'string'
        },
        resource: {
          type: 'string'
        },
        action: {
          type: 'string',
          enum: [
            'read:any',
            'create:any',
            'update:any',
            'delete:any',
            'read:own',
            'create:own',
            'update:own',
            'delete:own'
          ]
        }
      }
    }
  }

  static get relationMappings() {
    return {
      attributes: {
        relation: BaseModel.HasManyRelation,
        modelClass: PrivilegeAttributes,
        join: {
          from: 'core_privileges.privilege_id',
          to: 'core_privilege_attributes.privilege_id'
        }
      }
    }
  }

  static get GraphQLType () {
    return new GraphQLObjectType({
      name: 'CorePrivilege', // from json schema. Append input if input type
      description: 'A privilege that can be assigned to a role', // jsonschema
      fields: () => ({
        privilege_name: {
          type: GraphQLString
        },
        description: {
          type: GraphQLString
        },
        resource: {
          type: GraphQLString
        },
        action: {
          type: new GraphQLEnumType({
            name: 'AccessControlActionValues',
            values: {
              'read:any': {
                name: 'Read Any',
                description: 'Read Resource with any ownership'
              },
              'create:any': {
                name: 'Create Any',
                description: 'Create Resource with any ownership'
              },
              'update:any': {
                name: 'Update Any',
                description: 'Update Resource with any ownership'
              },
              'delete:any': {
                name: 'Delete Any',
                description: 'Delete Resource with any ownership'
              },
              'read:own': {
                name: 'Read Own',
                description: 'Read Resource with own ownership'
              },
              'create:own': {
                name: 'Create Own',
                description: 'Create Resource with own ownership'
              },
              'update:own': {
                name: 'Update Own',
                description: 'Update Resource with own ownership'
              },
              'delete:own': {
                name: 'Delete Own',
                description: 'Delete Resource with own ownership'
              }
            },
            description: 'Possible values for access control actions'
          })
        },
        module_id: {
          type: GraphQLString
        }
      })
    })
  }
}


(async function () {
  let priv = await Privilege.query().eager('attributes')
  console.log(priv)
  console.log(priv[0].attributes)
  knex.destroy()
})()


class Person extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'persons';
  }

  // Optional JSON schema. This is not the database schema!
  // Nothing is generated based on this. This is only used
  // for validation. Whenever a model instance is created
  // it is checked against this schema.
  // http://json-schema.org/.
  static get jsonSchema () {
    return {
      name: 'CorePerson',
      description: 'A Person',
      type: 'object',
      required: ['firstName', 'lastName'],

      properties: {
        id: {type: 'integer'},
        parentId: {type: ['integer', 'null']},
        firstName: {type: 'string', minLength: 1, maxLength: 255},
        lastName: {type: 'string', minLength: 1, maxLength: 255},
        age: {type: 'number'},

        // Properties defined as objects or arrays are
        // automatically converted to JSON strings when
        // writing to database and back to objects and arrays
        // when reading from database. To override this
        // behaviour, you can override the
        // Person.jsonAttributes property.
        address: {
          type: 'object',
          properties: {
            street: {type: 'string'},
            city: {type: 'string'},
            zipCode: {type: 'string'}
          }
        }
      }
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      pets: {
        relation: Model.HasManyRelation,
        // The related model. This can be either a Model
        // subclass constructor or an absolute file path
        // to a module that exports one. We use the file
        // path version here to prevent require loops.
        modelClass: __dirname + '/Animal',
        join: {
          from: 'persons.id',
          to: 'animals.ownerId'
        }
      },

      movies: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/Movie',
        join: {
          from: 'persons.id',
          // ManyToMany relation needs the `through` object
          // to describe the join table.
          through: {
            from: 'persons_movies.actorId',
            to: 'persons_movies.movieId'

            // If you have a model class for the join table
            // you can specify it like this:
            //
            // modelClass: PersonMovie,

            // Columns listed here are automatically joined
            // to the related models on read and written to
            // the join table instead of the related table
            // on insert.
            //
            // extra: ['someExtra']
          },
          to: 'movies.id'
        }
      },

      children: {
        relation: Model.HasManyRelation,
        modelClass: Person,
        join: {
          from: 'persons.id',
          to: 'persons.parentId'
        }
      },

      parent: {
        relation: Model.BelongsToOneRelation,
        modelClass: Person,
        join: {
          from: 'persons.parentId',
          to: 'persons.id'
        }
      }
    };
  }
}