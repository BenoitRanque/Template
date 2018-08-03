module.exports = async (input, { eager, own, status }, { authorize, model, session }) => {
  // convert own to boolean from string
  if (own) own = Boolean(own)
  
  let permission = authorize(model.resourceName, 'read', 'any')

  const owner_id = session.user.user_id
  
  const query = model.query()
    .allowEager('[slots.schedule.[breaktime, uptime, downtime], authorization.user, employee, owner]')
    .eager(eager || '')

  if (own) {
    query.where({ owner_id })
  }
  
  if (status && status.length) {
    let pending = status.includes('pending')
    let approved = status.includes('approved')
    let denied = status.includes('denied')
    query.leftJoin('hr_att_exception_authorization', 'hr_att_exception.exception_id', 'hr_att_exception_authorization.exception_id')
    query.where(function () {
      if (pending) {
        this.where('hr_att_exception_authorization.authorization_id', null)
      } 
      if (approved) {
        this[pending ? 'orWhere' : 'where']({ granted: true })
      } 
      if (denied) {
        this[pending || approved ? 'orWhere' : 'where']({ granted: false })
      }
    })
  }

  console.log(query.toString())

  let data = await query
  
  
  return permission.filter(data)
}