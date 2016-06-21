
exports.up = function(knex, Promise) {
  return knex.schema.createTable('questions', function(table){
    table.increments();
    table.integer('deck_id');
    table.string('question');
    table.string('answer');
    table.integer('difficulty');
    table.string('question_url');
    table.string('answer_url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('questions');
};
