
exports.up = function(knex, Promise) {
  return knex.schema.createTable('wrongs', function(table){
    table.increments();
    table.integer('question_id');
    table.integer('user_id');
    table.integer('deck_id');
    table.date('updated');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('wrongs');
};
