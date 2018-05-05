module.exports = class BaseResolver {
  constructor (config) {
    // validate config, set usefull defaults
    let {
      method, // the method tha will be unique per resolver
    } = config

    this.config = { method }
    // return resolver function

    return async (parent, { filter, action, input }, { ac, session }, info) => {

      
      let
        { ac, session } = context,
        permission = null,
        value = null

      if (this.config.authorize) {
        permission = await ac.authorize(session, this.config.resource,  this.config.action)
      }
      else if (this.config.authenticate) {
        await ac.authenticate(session)
      }


      this.config.method({
        // model
        // parent
        // eager expression only authorized resources
        // filter data (recursive)
        // filter input (recursive)
        eager: () => this.__eager(),
        input: () => this.__input(),
        filter: query => this.__filter(query, this.config.model, filter)
      })
    }
  }

  __eager (data, info) {
    // return filtered eager expression
  }

  __input (data, info) {
    // return filtered input
  }

  __filter(query, filters) {
    if (!filters) return query

    Object.keys(filters).forEach(filterName => { this.config.model.filters[filterName](query, filters[filterName]) })

    return query
  }

  recursiveFilter() {

  }

  async __filterOutput(ac, session, model, action, data) {

    let permission = this.__permission(ac, session, model.resource, action, this.__ownership(model, action, data))
    if (!permission.granted) return null
    data = permission.filter(data)
    
    const handleRelations = item => {
      let relations = model.getRelations()
      Object.keys.forEach(relationName => {
        let relation = relations[relationName]
        if (relation) {
          item[relationName] = this.__filterOutput(ac, session, relation.relatedModelClass, action, item[relationName])
        }
      })
      return item      
    }

    if (Array.isArray(data)) {
      data = data.map(handleRelations)
    }
    else {
      data = handleRelations(data)
    }
  }

  async __permission(ac, session, resource, action, ownership) {
    let actionOwnership = `${action}:${ownership ? 'own' : 'any'}`

    let permission = await ac.permission(session, resource, actionOwnership)

    // if permission denied as owner, try any
    if (!permission.granted && ownership) return await this.__permission(data, action, false)
    
    return permission
  }

  __ownership(model, action, data) {
    return model.ownership ? model.ownership(data, action) : false
  }
}

let res = new BaseResolver({
  method: ({ eager, model, input }) => model.query().eager(...eager()),
  method2: ({ eager, model, input }) => model.query.insertGraph(input()),
  method3: ({ action, model, filter, input }) => {
    switch (action) {
      case 'read':
        return filter(model.query()).eager(...eager())
        break
      case 'create':

        break
      case 'update':
        
        break
      case 'delete':

        break
      default:
        throw new Error(`Invalid action passed to resolver: ${action}`)
    }
  }
})