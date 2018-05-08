
exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await knex('core_roles').del()

  // Inserts seed entries
  let [adminRoleId, userRoleId] = await knex('core_roles').insert([
    { role_name: 'admin', description: ''},
    { role_name: 'user', description: ''}
  ], 'role_id') // return role_id

  let privileges = await knex('core_privileges').select()

  rolePrivileges = privileges.map(({ possession, privilege_id }) => {
    switch (possession) {
      case 'own':
        return {
          privilege_id,
          role_id: userRoleId,
          attributes: ['*']
        }
      case 'any':
        return {
          privilege_id,
          role_id: adminRoleId,
          attributes: ['*']
        }
    }
  })

  await knex('core_role_privileges').del()
  await knex('core_role_privileges').insert(rolePrivileges)

  await knex('core_role_extend').del()
  await knex('core_role_extend').insert([
    { extended_role_id: adminRoleId, base_role_id: userRoleId }
  ])
}


