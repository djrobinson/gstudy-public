var knex = require('./knex');

function Questions() {
  return knex('questions');
}

module.exports = {
  getQuestions: function(){
    return Questions().select();
  },
  getQuestion: function(id){
    return Questions().where('id', id);
  },
  getDeckQuestions: function(deck_id){
    return Questions().where('deck_id', deck_id);
  },
  createQuestion: function(question){
    return Questions().insert(question, 'id');
  }
};