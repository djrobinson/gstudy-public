var knex = require('./knex');

function Decks() {
  return knex('decks');
}

module.exports = {
  getDecks: function(){
    return Decks().select();
  },
  getDeck: function(id){
    return Decks().where('id', id);
  },
  createDeck: function(deck){
    return Decks().insert(deck, 'id');
  },
  getUserDecks: function(user_id){
    return Decks().where('user_id', user_id);
  }
};