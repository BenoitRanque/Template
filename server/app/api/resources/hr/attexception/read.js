module.exports = async (input, { eager, own, pending, approved, denied }, { authorize, model, session }) => {
  console.log(own, pending, approved, denied)
  if (own) {
    console.log(typeof own)
  }
  // NOTE: current problem is params are string, not boolean
  
  let permission = authorize(model.resourceName, 'read', 'any')

  const owner_id = session.user.user_id
  
  const query = model.query()
    .allowEager('[slots.schedule.[breaktime, uptime, downtime], authorization.user, employee, owner]')
    .eager(eager || '')

  if (own) {
    query.where({ owner_id })
  }
  
  if ([pending, approved, denied].includes(true)) {    
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