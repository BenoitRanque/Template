module.exports = async (input, { eager, timetype_id, category, additional, accountable, paid }, { authorize, model }) => {

  let permission = authorize(model.resourceName, 'read', 'any')

  let data = await model.query().allowEager('').eager(eager || '').where(query => {
    if (timetype_id !== undefined) {
      Array.isArray(timetype_id) ? query.whereIn('timetype_id', timetype_id) : query.where('timetype_id', timetype_id)
    }
    if (category !== undefined) {
      query.where({ category })
    }
    if (paid !== undefined) {
      query.where({ paid })
    }
    if (additional !== undefined) {
      query.where({ additional })
    }
    if (accountable !== undefined) {
      query.where({ accountable })
    }
  })

  return permission.filter(data)
}