const Privilege = require('@models/core/Privilege')

module.exports = async ({ fields, filters }, { authorize, recursiveFilter }, input, params) => {
  let permission = authorize(Privilege.resource, 'read')

  let data = await Privilege.query().applyFilters(filters).eagerFromFields(fields)

  return recursiveFilter(Privilege, data, 'read')
}