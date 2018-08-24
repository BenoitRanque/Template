
exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await knex('core_roles').del()

  // Inserts seed entries
  let [adminRoleId, userRoleId] = await knex('core_roles').insert([
    { role_name: 'admin', description: ''}
  ], 'role_id') // return role_id

  let privileges = await knex('core_privileges').select()

  await knex('core_role_privileges').del()
  await knex('core_role_privileges').insert(privileges.map(({ privilege_id }) => ({ privilege_id, role_id: adminRoleId })))
}
