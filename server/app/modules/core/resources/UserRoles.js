module.exports = {
  table: 'core_user_roles',
  findByUserId: user_id => knex(this.table).where({ user_id }).select()
}