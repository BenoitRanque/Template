class Resolver {
  constructor (model, method, config) {
    {
      // bracket scope
      // validate configuration and set defaults
      if (!model) throw new Error(`model is a required parameter of the resolver`)
      if (!method) throw new Error(`method is a required parameter of the resolver`)
  
      this.model = model
      this.method = method
      this.config = { 
        authenticate: true,
        authorize: true,
        params: null,
        resource: model.resource, 
        ...config
      }
    }
    // separate read requests from the rest.
    return async (req, res, next) => {
      try {
        let
          { ac, session, body } = req,
          context = { ac, session },
          data = body,
          permission = null,
          action = HTTPmethodToAction(req.method),
          ownership = req.query ? !!req.query.own : false,
          actionownership = `${action}:${ ownership ? 'own' : 'any' }`,
          resource = this.config.resource,

        if (this.config.authorize) {
          permission = await ac.authorize(session, this.model.resource,  actionownership)
        }
        else if (this.config.authenticate) {
          await ac.authenticate(session)
        }

        let
          graph = new QueryGraph(this.model, req.query ? req.query.graph : null, true).authorize(resource => ac.permission(session, resource, action)),
          params = this.config.params ? this.config.params(req, res, next) : null,
          info = {
            permission,
            action,
            ownership,
            actionownership,
            resource,
            graph,
            params
          }
        
        let results = await this.method(this.model, data, info, context)
        
        if (permission) {
          results = permission.filter(results)
        }

        res.status(200).json({ data: results })
      }
      catch (error) {
        console.log(error)
        res.status(500).end(error)
      }
    }
  }
}

class QueryGraph {
  constructor (model, graph, encoded) {
    this.model = model
    if (encoded) graph = this.decode(graph)
    this.graph = graph || []
  }

  encode () {
    return encodeURI(btoa(JSON.stringify(this.graph)))
  }

  decode () {
    return JSON.parse(atob(decodeURI(this.graph)))
  }

  authorize(permit) {
    // validate this graph as authorized
  }

  typeOf(field) {
    return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()
  }

  root (graph) {
    if (!graph) graph = this.graph
    // return top level property field
    switch (this.typeOf(graph)) {
      case 'string': return graph
      case 'array': return graph[0]
      default: throw new Error(`Invalid root field for graph ${graph}`)
    }
  }
  fields (graph) {
    if (!graph) graph = this.graph
    if (!Array.isArray(graph)) return []
    if (graph.length > 1 && this.typeOf(graph[1]) === 'object') return graph.slice(2)
    return graph.slice(1)
  }
  filters (graph) {
    if (!graph) graph = this.graph
    if (!Array.isArray(graph)) return {}
    if (graph.length > 1 && this.typeOf(graph[1]) === 'object') return graph[1]
    return {} 
  }
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

function filterOutput (data, model, permit) {
  const permissionCache = {}

  return recursiveFilter(data, model)

  function permit (resource) {
    if (!permissionCache[resource]) permissionCache[resource] = this.permit(resource)
    return permissionCache[resource]
  }

  function recursiveFilter (data, model) {
    let permission = permit(model.resource)
    if (!permission.granted) return null
    
    data = permission.filter(data)

    if (Array.isArray(data)) return recursiveFilterArray(data, model)
    return recursiveFilterObject(data, model)
  }

  function recursiveFilterArray (data, model) {
    return data.map(item => recursiveFilterObject(item, model))
  }
  
  function recursiveFilterObject (data, model) {      
    let relations = model.getRelations()
    Object.keys(data).forEach(fieldName => {
      let relation = relations[fieldName]
      if (relation) data[fieldName] = recursiveFilter(data[fieldName], relation.relatedModelClass)
    })

    return data
  }
}

module.exports = Resolver
