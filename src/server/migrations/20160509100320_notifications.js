
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notifications', function(table){
    table.increments();
    table.string('user');
    table.string('content');
    table.date('updated');
    table.boolean('read');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('notifications');
};
