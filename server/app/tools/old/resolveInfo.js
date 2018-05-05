module.exports = class resolverInfo {
  constructor (model, parent, args, context, info) {
    let { ac, session } = context
  }

  hasOwnerShip(model, data, session) {
    return model.owner(data, session.user.user_id)
  }

  eager () {
    // generate eager expression. is authorized
  }

  filter(data) {
    // deep filter of data 
  }

  graph () {
    // input graph
  }
}

class resolverInfo {
  constructor ({ model, info, action, session, ac }) {
    this.eager = [expression, filter] // eager expression 
    this.inputGraph = {} // filtered input graph

    this.resolverInfo = {

    }
  }

  filter (data) {
    // return filtered data
  }

}

function filter (data, { model, permission, relations }) {
  if (!data || !permission.granted) return null
  if (Array.isArray(data)) return data.map(item => filter(item, { model, action, relations }))

  data = permission.filter(data)

  Object.keys(relations).forEach(relationName => {
    if (!data[relationName]) return
    
  })
}




cachedPermissions = {
  'Resource': {
    'action:ownership': permission
  }
}

function permission (resource, action, ownership) {
  action = `${action}:${ownership ? 'own' : 'any'}`
  // verify if exists. if not create
  return permissionCache[resource][action]
}


function hasOwnerShip (node, model) {
  // return boolean
}
// function to detemine what permision object create permission object
// send to cache





class resolverInfo {
  constructor (info, model, { ac, session } , action) {
    this.ac = ac
    this.session = session

    this.action = action
    this.permissions = {}

  }



  getFiltered(model, data) {
    return this.getPermision(model.resource, this.action, this.getOwnership(model, data)).filter(data)
  }

  getOwnership (model, data) {
    if (!model.getOwnership || !this.session || !this.session.user || !this.session.user || !this.session.user.user_id) return false
    return model.getOwnership(data, this.session.user.user_id, this.action)
  }

  getPermision (resource, action, ownership) {
    let actionOwnership = `${action}:${ownership ? 'own' : 'any'}`

    if (!this.permissions[resource]) this.permissions[resource] = {}
    
    if (!this.permissions[resource][actionOwnership]) {
      // create permision
      this.permissions[resource][actionOwnership] = ac.authorize(this.session, resource, actionOwnership)
    }

    let permision = this.permissions[resource][actionOwnership]

    // if ownership is had and permission is not granted, default to any ownership
    if (!permision.granted && ownership) return this.getPermision(resource, action, false)

    return permision
  }
}