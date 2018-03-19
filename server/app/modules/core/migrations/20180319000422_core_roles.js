
exports.up = function(knex, Promise) {
  return knex.schema.hasTable('core_roles').then(has => {
    console.log(has)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.hasTable('core_roles').then(has => {
    console.log(has)
  })
};
