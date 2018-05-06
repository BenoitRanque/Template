class Resolver {
  constructor (method, params) {
    this.method = method
    this.params = params ? params : () => {} 

    return async (req, res, next) => {
      try {
        let { accessControl, session, body, query, method } = req
        let { possession, filters, fields } = query

        let action = HTTPmethodToAction(method)
        let actionpossession = `${action}:${  }`

        let permission = null

        if (this.config.authorize && resource) {
          permission = await accessControl.authorize(session, resource, actionown)
        }
        else if (this.config.authenticate) {
          await accessControl.authenticate(session)
        }
        let info = {
          action: HTTPmethodToAction(method),
          possession: possession ? possession : 'any',
          session,
          fields: fields ? decode(fields) : [],
          filters: filters ? decode(filters) : {},
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

        let params = this.params(req, res, next)

        let output = await this.method(info, tools, body, params)

        res.status(200).json(output)
      }
      catch (error) {
        console.log(error)
        res.status(500).end(error)
      }
    }
  }
}

function encode (data) {
  return encodeURI(btoa(JSON.stringify(data)))
}

function decode (data) {
  return JSON.parse(atob(decodeURI(data)))
}

function HTTPmethodToAction (method) {
  switch (method) {
    case 'GET': return 'read'
    case 'POST': return 'create'
    case 'PUT': return 'update'
    case 'DELETE': return 'delete'
    default: throw new Error(`Unsuported HTTP method ${method}`)
  }
}

function recursiveFilter (model, accessControl, data, action, possession) {
  const permissionCache = {}
  let permission = (resource, action) => {
    if (!permissionCache[resource]) permissionCache[resource] = {}
    if (!permissionCache[resource][action]) permissionCache[resource][action] = accessControl.permission(session, resource, action, possession)
    return permissionCache[resource][action]
  }

  function filter (model, data) {
    let permission = permission(model.resource, action).filter(data)
    if (!permission.granted) return
    data = permission.filter(data)
  
    if (Array.isArray(data)) {
      return filterArray(model, data)
    }
    else {
      return filterObject(model, data)
    }
  }
  
  function filterArray (model, data) {
    return data.map(item => filterObject(model, item))
  }
  
  function filterObject (model, data) {
    let relations = model.getRelations()
    Object.keys(data).forEach(propName => {
      let relation = relations[propName]
      if (!relation) return
      data[propName] = filter(relation.relatedModelClass, data[propName])               
    })
    return data
  }

  return filter(model, data)
}

module.exports = Resolver
