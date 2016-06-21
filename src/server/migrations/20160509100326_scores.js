
exports.up = function(knex, Promise) {
  return knex.schema.createTable('scores', function(table){
    table.increments();
    table.integer('user_id');
    table.integer('deck_id');
    table.integer('num_right');
    table.integer('num_wrong');
    table.date('updated');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('scores');
};
