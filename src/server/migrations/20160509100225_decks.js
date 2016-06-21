
exports.up = function(knex, Promise) {
  return knex.schema.createTable('decks', function(table){
    table.increments();
    table.string('title');
    table.text('description');
    table.date('updated');
    table.integer('user_id');
    table.string('img_url')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('decks');
};
