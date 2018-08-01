module.exports = async (input, { eager, own, pending, approved, denied }, { authorize, model, session }) => {

  let permission = authorize(model.resourceName, 'read', 'any')

  const owner_id = session.user.user_id

  const query = model.query()
    .allowEager('[slots.schedule.[breaktime, uptime, downtime], authorization.user, employee, owner]')
    .eager(eager || '')

  if (own) {
    query.where({ owner_id })
  }
  
  query.leftJoin('hr_att_exception_authorization', 'hr_att_exception.exception_id', 'hr_att_exception_authorization.exception_id')
  if (pending) {
    query.where('hr_att_exception_authorization.authorization_id', null)
  } 
  if (approved) {
    query.where({ granted: true })
  } 
  if (denied) {
    query.where({ granted: false })
  }

  let data = await query


  return permission.filter(data)
}