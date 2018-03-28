module.exports = {
  table: 'core_users',
  findById: user_id => knex(this.table).where({ user_id }).select(),
  findByUsername: username => knex(this.table).where({ username }).select()
}
