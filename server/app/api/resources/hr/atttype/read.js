module.exports = async (input, { eager, type_id }, { authorize, model }) => {
  console.log(type_id)
  let permission = authorize(model.resourceName, 'read', 'any')

  let data = await model.query().allowEager('').eager(eager || '').where(query => {
    if (type_id === undefined) return
    Array.isArray(type_id) ? query.whereIn('type_id', type_id) : query.where('type_id', type_id)
  })

  return permission.filter(data)
}