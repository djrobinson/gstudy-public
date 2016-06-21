var express = require('express');
var router = express.Router();
var query = require('../db/deck_queries.js');

router.get('/', function(req, res, next){
  query.getDecks().then(function(data){
    res.json(data);
  });
});

router.get('/:id/deck', function(req, res, next){
  query.getDeck(req.params.id).then(function(data){
    res.json(data);
  });
});

router.get('/:id/user', function(req, res, next){
  query.getUserDecks(req.params.id).then(function(data){
    res.json(data);
  });
});

router.post('/create', function(req, res, next){
  console.log(req.body);
  var deck = req.body;
  query.createDeck(deck).then(function(data){
    res.json(data);
  });
});

module.exports = router;