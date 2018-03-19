
exports.up = async function(knex, Promise) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto" schema public')
  await knex.schema.withSchema('public').createTable('core_modules', table => {
    table.string('module_id').primary()
    table.text('description')
  })
  await knex.schema.withSchema('public').createTable('core_resources', table => {
    table.uuid('resource_id').unique().notNullable().primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.string('module_id').notNullable()
    table.text('route')
    table.string('method')
    table.text('description')

    table.unique(['route', 'method'])
    table.foreign('module_id').references('module_id').inTable('core_modules').onUpdate('CASCADE').onDelete('CASCADE') // deleting/updating module will delete/update all records featuring that module
  })
  await knex.schema.withSchema('public').createTable('core_privileges', table => {
    table.uuid('privilege_id').unique().notNullable().primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.foreign('module').references('module_id').inTable('core_modules')
    table.string('name').notNullable()
    table.unique(['name', 'module']) // unique combination
    table.text('description')
  })
  await knex.schema.withSchema('public').createTable('core_privilege_resources', table => {
    table.uuid('privilege_id').references('privilege_id').inTable('core_privileges')
    table.uuid('resource_id').references('resource_id').inTable('core_resources')

    table.primary(['role_id', 'privilege_id'])
  })
  await knex.schema.withSchema('public').createTable('core_roles', table => {
    table.uuid('role_id').unique().notNullable().primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.string('name').unique().notNullable()
    table.text('description')
    table.specificType('privileges', 'UUID[]')
    table.foreign('privileges').references('id').inTable('core_privileges')
  })
  await knex.schema.withSchema('public').createTable('core_role_privileges', table => {
    table.uuid('role_id').references('role_id').inTable('core_roles')
    table.uuid('privilege_id').references('privilege_id').inTable('core_privileges')
    table.primary(['role_id', 'privilege_id'])
  })

  await knex.schema.withSchema('public').createTable('core_users', table => {
    table.uuid('user_id').unique().notNullable().primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.string('username').unique().notNullable()
    table.text('password').notNullable()
    table.string('displayname').notNullable()
    table.text('description')
    table.specificType('roles', 'UUID[]')
    table.foreign('roles').references('id').inTable('core_roles')
  })
  await knex.schema.withSchema('public').createTable('core_user_roles', table => {
    table.uuid('user_id').references('user_id').inTable('core_users')
    table.uuid('role_id').references('role_id').inTable('core_roles')
    table.primary(['role_id', 'privilege_id'])
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.withSchema('public').dropTable('core_users')
  await knex.schema.withSchema('public').dropTable('core_roles')
  await knex.schema.withSchema('public').dropTable('core_privileges')
  await knex.schema.withSchema('public').dropTable('core_modules')
  await knex.raw('DROP EXTENSION "pgcrypto"')
}
