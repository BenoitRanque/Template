module.exports = async (input, { eager }, { authorize, model }) => {

  let permission = authorize(model.resourceName, 'read', 'any')

  let data = await model.query().allowEager('[employee, slots.schedule.[break, uptime, downtime]]').eager(eager ? eager.replace(/slots/, 'slots(orderByIndex)') : '', {
    orderByIndex: query => query.orderBy('index', 'ASC')
  })

  return permission.filter(data)
}