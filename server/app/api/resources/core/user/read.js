const User = require('@models/core/User')

module.exports = async ({ fields, filters }, { authorize, recursiveFilter }, input, params) => {
  let permission = authorize(User.resource, 'read')

  let data = await User.query().applyFilters(filters).eagerFromFields(fields)

  return recursiveFilter(User, data, 'read')
}