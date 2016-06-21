var express = require('express');
var router = express.Router();
var query = require('../db/wrong_queries.js');


router.post('/create', function(req, res, next){
  console.log(req.body);
  var question = req.body;
  query.createWrong(question).then(function(data){
    res.json(data);
  });
});

router.get('/:user_id/:deck_id', function(req, res, next){
  var user_id = req.params.user_id;
  var deck_id = req.params.deck_id;
  query.getWrongs(user_id, deck_id).then(function(data){
    res.json(data);
  });
});

module.exports = router;