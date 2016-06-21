var router = require('express').Router();
var knex = require('../db/knex.js');

router.get('/ping', function(req, res, next){
  global.io.emit('status', 'pong!');
  res.status(200).json({ message: 'pong!' });
});

router.get('/', function(req, res, next){
  knex('notifications').select()
    .then(function(notifications){
      res.status(200).json(notifications);
    });
});

router.post('/create', function(req, res, next){
  if ( !req.body || !req.body.content ) {
    res.status(422).json({ errors: { invalid: 'Requires a `content` key.' }});
  } else {
    console.log(req.body);
    req.body.updated = new Date();
    req.body.read = false;
    knex('notifications').insert(req.body)
    .then(function (notification) {
      global.io.emit('notification.create', notification);
      res.status(201).json(notification);
    })
    .catch(function (notification) {
      res.status(422).json(notification);
    });
  }
});

router.put('/:id/read', function(req, res, next){
  knex('notifications').select().where('id', req.params.id)
    .then(function(notification){
      console.log("Notification ", notification);
      notification[0].read = true;
      return knex('notifications').where('id', req.params.id).update(notification[0], '*');
    })
    .then(function(notification){
      global.io.emit('notification.read', notification.id + 'was read.');
      res.status(200).json(notification);
    })
    .catch(function(notification){
      res.status(200).json(notification);
    });
});

module.exports = router;
