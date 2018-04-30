const { GraphQLNonNull, GraphQLList, GraphQLString } = require('graphql')
const Resolver = require('@tools/resolver')
const { User } = require('../models')

module.exports = {
  users: Resolver.query(User, 'read:any', 'role'),
  user: Resolver.query(User, 'read:any', 'role.privileges.privilege', query => query.first())
}


{
  validate: object => object,
  eager: '',
  permission,
  fields: {

  }
}

this.permission[resource][action]



let obj = {
  eager: '', // the string eager value of this field,
  permision: permision, // the permission object. Cached
  validate: value => value, // validation function. run for each memeber item. must return the valid value and can be user to change it. consider renaming
  relations: {
    'stringname': {

    }
  }
}



class resolverInfo {
  constructor (info, session) {
    this.permissionCache = {}
    this.session = session
  }

  permission (resource, action) {
    try {
      return this.permissionCache[resource][action]
    } catch (error) {
      return undefined
    }
  }

  get eager () {
    // return array of form [eagerExpression, eagerFilters]
  }

  get input () {
    // return only authorized input values. used for graph insert
  }
  get query () {
    // return only authorized input values. used for graph insert
  }
  get filter () {
    // return only authorized input values. used for graph insert
  }
  get filteredInput () {
    
  }
  
  filterQuery (values) {
  }
  filterInput (values) {
    // return filtered values per auth
  }
}