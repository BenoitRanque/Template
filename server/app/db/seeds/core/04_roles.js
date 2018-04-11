
exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await knex('core_roles').del()

  // Inserts seed entries
  let [adminRoleId, userRoleId] = await knex('core_roles').insert([
    { role_name: 'admin', description: ''},
    { role_name: 'user', description: ''}
  ], 'role_id') // return role_id

  let privileges = await knex('core_privileges').select()

  rolePrivileges = privileges.map(({ action, privilege_id }) => {
    switch (action) {
      case 'read:own':
      case 'create:own':
      case 'update:own':
      case 'delete:own':
        return {
          privilege_id,
          role_id: userRoleId,
          attributes: ['*']
        }
      case 'read:any':
      case 'create:any':
      case 'update:any':
      case 'delete:any':
        return {
          privilege_id,
          role_id: adminRoleId,
          attributes: ['*']
        }
    }
  })

  await knex('core_role_privileges').insert(rolePrivileges)

  await knex('core_role_extend').del()
  await knex('core_role_extend').insert([
    { extended_role_id: adminRoleId, base_role_id: userRoleId }
  ])
}


