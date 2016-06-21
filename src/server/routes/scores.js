var express = require('express');
var router = express.Router();
var query = require('../db/score_queries.js');


router.post('/create', function(req, res, next){
  console.log(req.body);
  var question = req.body;
  query.createScore(question).then(function(data){
    res.json(data);
  });
});

router.put('/update', function(req, res, next){
  var score = req.body;
  query.updateScore(score).then(function(data){
    res.json(data);
  });
});

module.exports = router;