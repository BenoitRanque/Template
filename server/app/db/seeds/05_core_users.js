const bcrypt = require('bcrypt')
const { SALT_ROUNDS } = require('@config').bcrypt


exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await knex('core_users').del()

  let [userId, adminId] = await knex('core_users').insert([
    { username: 'user', displayname: 'User' },
    { username: 'admin', displayname: 'Administrator' }
  ], 'user_id') // return user_id

  let userPass = await bcrypt.hash('', SALT_ROUNDS)
  let adminPass = await bcrypt.hash('admin', SALT_ROUNDS)

  await knex('core_user_password').where({ user_id: userId }).insert({ user_id: userId, password: userPass})
  await knex('core_user_password').where({ user_id: adminId }).insert({ user_id: adminId, password: adminPass})

  let adminRoleId = await knex('core_roles').where({ role_name: 'admin' }).select([ 'role_id' ])
  adminRoleId = adminRoleId[0].role_id

  let userRoleId = await knex('core_roles').where({ role_name: 'user' }).select([ 'role_id' ])
  userRoleId = userRoleId[0].role_id

  await knex('core_user_roles').insert([
    { user_id: adminId, role_id: adminRoleId },
    { user_id: userId, role_id: userRoleId }
  ])
}
