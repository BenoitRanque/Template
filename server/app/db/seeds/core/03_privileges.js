
exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await knex('core_privileges').where({ resource: 'core_User' }).del()

  let privileges = await knex('core_privileges').insert([
    { privilege_name: 'Read any user', description: '', resource: 'core_User', action: 'read:any', module_id: 'core' },
    { privilege_name: 'Create any user', description: '', resource: 'core_User', action: 'create:any', module_id: 'core' },
    { privilege_name: 'Update any user', description: '', resource: 'core_User', action: 'update:any', module_id: 'core' },
    { privilege_name: 'Delete any user', description: '', resource: 'core_User', action: 'delete:any', module_id: 'core' },
    { privilege_name: 'Read own user', description: '', resource: 'core_User', action: 'read:own', module_id: 'core' },
    { privilege_name: 'Create own user', description: '', resource: 'core_User', action: 'create:own', module_id: 'core' },
    { privilege_name: 'Update own user', description: '', resource: 'core_User', action: 'update:own', module_id: 'core' },
    { privilege_name: 'Delete own user', description: '', resource: 'core_User', action: 'delete:own', module_id: 'core' }
  ], 'privilege_id') // return privilege_id

  // insert coresponding attributes
  let attributes = []
  privileges.forEach(privilege_id => {
    attributes = attributes.concat([
        'username',
        'password',
        'displayname',
        'description',
        'group',
        'role'
      ].map(attribute => {
        return { privilege_id, attribute}
      }))
  })

  await knex('core_privilege_attributes').insert(attributes)

}
