
exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await knex('core_privileges').where({ resource: 'core_User' }).del()

  let attributes = [
    'username',
    'password',
    'displayname',
    'description',
    'group',
    'role'
  ]

  await knex('core_privileges').insert([
    { privilege_name: 'Read any user', description: '', resource: 'CoreUser', action: 'read:any', attributes, module_id: 'core' },
    { privilege_name: 'Create any user', description: '', resource: 'CoreUser', action: 'create:any', attributes, module_id: 'core' },
    { privilege_name: 'Update any user', description: '', resource: 'CoreUser', action: 'update:any', attributes, module_id: 'core' },
    { privilege_name: 'Delete any user', description: '', resource: 'CoreUser', action: 'delete:any', attributes, module_id: 'core' },
    { privilege_name: 'Read own user', description: '', resource: 'CoreUser', action: 'read:own', attributes, module_id: 'core' },
    { privilege_name: 'Create own user', description: '', resource: 'CoreUser', action: 'create:own', attributes, module_id: 'core' },
    { privilege_name: 'Update own user', description: '', resource: 'CoreUser', action: 'update:own', attributes, module_id: 'core' },
    { privilege_name: 'Delete own user', description: '', resource: 'CoreUser', action: 'delete:own', attributes, module_id: 'core' }
  ])
}
