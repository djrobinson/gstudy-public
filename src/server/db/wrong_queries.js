var knex = require('./knex');

function Wrongs() {
  return knex('wrongs');
}

module.exports = {
  getWrongs: function(user_id, deck_id){
    return Wrongs().select().where('user_id', user_id).andWhere('deck_id', deck_id);
  },
  createWrong: function(question){
    return Wrongs().insert(question, 'id');
  }
};