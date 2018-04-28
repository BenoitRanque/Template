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
