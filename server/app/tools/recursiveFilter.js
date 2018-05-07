module.exports = function recursiveFilter (model, accessControl, data, action, possession) {
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
    Object.keys(relations).forEach(relationName => {
      if (data[relationName] === undefined) return
      data[relationName] = filter(relations[relationName].relatedModelClass, data[relationName])
    })
    return data
  }

  return filter(model, data)
}
