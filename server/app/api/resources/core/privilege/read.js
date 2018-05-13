const Privilege = require('@models/core/Privilege')

module.exports = async ({ fields, filters }, { authorize }, input, params) => {
  let permission = authorize(Privilege.resource, 'read')

  let data = await Privilege.query().applyFilters(filters).eagerFromFields(fields)

  return permission.filter(data)
}