
// exports.seed = async function(knex, Promise) {
//   // Deletes ALL existing entries
//   await knex('core_privileges').where({ resource: 'CoreUser' }).del()

//   let attributes = [
//     'username',
//     'password',
//     'displayname',
//     'description',
//     'group',
//     'role'
//   ]

//   await knex('core_privileges').insert([
//     { privilege_name: 'Read any user', description: '', resource: 'CoreUser', action: 'read', possession: 'any', attributes, module_id: 'core' },
//     { privilege_name: 'Create any user', description: '', resource: 'CoreUser', action: 'create', possession: 'any', attributes, module_id: 'core' },
//     { privilege_name: 'Update any user', description: '', resource: 'CoreUser', action: 'update', possession: 'any', attributes, module_id: 'core' },
//     { privilege_name: 'Delete any user', description: '', resource: 'CoreUser', action: 'delete', possession: 'any', attributes, module_id: 'core' },
//     { privilege_name: 'Read own user', description: '', resource: 'CoreUser', action: 'read', possession: 'own', attributes, module_id: 'core' },
//     { privilege_name: 'Create own user', description: '', resource: 'CoreUser', action: 'create', possession: 'own', attributes, module_id: 'core' },
//     { privilege_name: 'Update own user', description: '', resource: 'CoreUser', action: 'update', possession: 'own', attributes, module_id: 'core' },
//     { privilege_name: 'Delete own user', description: '', resource: 'CoreUser', action: 'delete', possession: 'own', attributes, module_id: 'core' }
//   ])
// }

exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await knex('core_privileges').del()

  let actions = ['read', 'create', 'update', 'delete']
  let possessions = ['any', 'own']
  let privileges = []

  require('@app/modules').forEach(module_id => {
    let models = require(`@models/${module_id}`)
    Object.keys(models).forEach(modelName => {
      let model = models[modelName]
      let attributes = [
        ...Object.keys(model.jsonSchema.properties),
        ...Object.keys(model.relationMappings || {})
      ]
      actions.forEach(action => {
        possessions.forEach(possession => {
          privileges.push({
            privilege_name: `${action} ${possession} ${model.name}`.replace(/\b\w/g, l => l.toUpperCase()),
            description: '',
            resource: model.resource,
            action,
            possession,
            attributes,
            module_id
          })
        })
      })
    })
  })

  await knex('core_privileges').insert(privileges)
}
