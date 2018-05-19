module.exports = function recursiveFilter (model, permission, session, data, action, possession = 'any') {
  const permissionCache = {}
  
  function getPermission (resource) {
    if (!permissionCache[resource]) permissionCache[resource] = permission(session, resource, action, possession)
    return permissionCache[resource]
  }

  function filter (model, data) {
    data = getPermission(model.resourceName).filter(data)
  
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
    Object.keys(relations).forEach(relationName => {
      if (data[relationName] === undefined) return
      data[relationName] = filter(relations[relationName].relatedModelClass, data[relationName])
    })
    return data
  }

  return filter(model, data)
}
