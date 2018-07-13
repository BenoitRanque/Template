module.exports = async (input, { eager }, { authorize, model }) => {

  let permission = authorize(model.resourceName, 'read', 'any')

  let data = await model.query().allowEager('[slots.schedule.timetable, request.user, authorization.user, employee]').eager(eager || '')

  return permission.filter(data)
}