module.exports = async (input, { eager }, { authorize, model }) => {

  let permission = authorize(model.resourceName, 'read', 'any')

  let data = await model.query().allowEager('slots.timetable.break').eager(eager ? eager.replace(/slots/, 'slots(orderByIndex)') : '', {
    orderByIndex: query => query.orderBy('index', 'ASC')
  })

  return permission.filter(data)
}