exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await knex('core_resources').del()

  let resources = []

  require('@app/modules').forEach(module_id => {
    let models = require(`@models/${module_id}`)
    Object.keys(models).forEach(modelName => {
      let model = models[modelName]
      resources.push({
        resource_id: model.resource,
        module_id
      })
    })
  })

  await knex('core_resources').insert(resources)
}
