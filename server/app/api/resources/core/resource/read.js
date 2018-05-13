const Resource = require('@models/core/Resource')

module.exports = async (info, { authorize }, input, params) => {
  let permission = authorize(Resource.resource, 'read', 'any')

  let data = await Resource.query()

  return permission.filter(data)
}