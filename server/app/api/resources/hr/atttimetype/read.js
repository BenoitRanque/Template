module.exports = async (input, { eager, timetype_id }, { authorize, model }) => {

  let permission = authorize(model.resourceName, 'read', 'any')

  let data = await model.query().allowEager('').eager(eager || '').where(query => {
    if (timetype_id === undefined) return
    Array.isArray(timetype_id) ? query.whereIn('timetype_id', timetype_id) : query.where('timetype_id', timetype_id)
  })

  return permission.filter(data)
}