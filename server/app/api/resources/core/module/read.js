const Module = require('@models/core/Module')

module.exports = async (info, { authorize }, input, params) => {
  let permission = authorize(Module.resource, 'read', 'any')

  let data = await Module.query()

  return permission.filter(data)
}