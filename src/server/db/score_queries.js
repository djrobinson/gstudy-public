var knex = require('./knex');

function Scores() {
  return knex('scores');
}

module.exports = {
  getScores: function(){
    return Scores().select();
  },
  getScore: function(id){
    return Scores().where('id', id);
  },
  updateScore: function(score){
    console.log(score);
    return Scores().update(score).where('id', score.id);
  },
  createScore: function(score){
    return Scores().insert(score, '*');
  }
};