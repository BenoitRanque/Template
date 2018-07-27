module.exports = async (input, { eager, standard }, { authorize, model }) => {

  let permission = authorize(model.resourceName, 'read', 'any')

  let data = await model.query().allowEager('[breaktime, uptime, downtime]').eager(eager || '').where(query => {
    standard === undefined ? null : query.where({ standard })
  })

  return permission.filter(data)
}