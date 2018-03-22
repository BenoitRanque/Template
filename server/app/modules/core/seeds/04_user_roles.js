
exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await knex('core_roles').del()

  // Inserts seed entries
  let [admin_role_id, user_role_id] = await knex('core_roles').insert([
    { role_name: 'admin', description: ''},
    { role_name: 'user', description: ''}
  ], 'role_id') // return role_id

  let privileges = await knex('core_privileges').where({ resource: 'users' }).select()

  let admin_privileges = [], user_privileges = []

  role_privileges = privileges.map(({ action, privilege_id }) => {
    switch (action) {
      case 'read:own':
      case 'create:own':
      case 'update:own':
      case 'delete:own':
        return {
          privilege_id,
          role_id: user_role_id,
          attributes: ['*']
        }
      case 'read:any':
      case 'create:any':
      case 'update:any':
      case 'delete:any':
        return {
          privilege_id,
          role_id: admin_role_id,
          attributes: ['*']
        }
    }
  })

  await knex('core_role_privileges').insert(role_privileges)

  await knex('core_role_extend').insert([
    { extended_role_id: admin_role_id, base_role_id: user_role_id }
  ])
}


