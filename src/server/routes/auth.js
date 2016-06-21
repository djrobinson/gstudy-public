var express = require('express');
var router = express.Router();

var knex = require('../db/knex');
var bcrypt = require('bcrypt');
var jwt    = require('jsonwebtoken');

function ensureAuthenticated(req, res, next) {
  if(req.user) {
    return next();
  } else {
    return res.redirect('/login');
  }
}
function loginRedirect(req, res, next) {
  if(req.user) {
    return res.redirect('/');
  } else {
    return next();
  }
}
function hashing (password) {
  console.log("hashing password ", password);
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}
function comparePassword(password, hashedpassword) {
    return bcrypt.compareSync(password, hashedpassword);
}
// Create username and Password Account
router.post('/register', function(req, res, next) {
  console.log(req.body);
  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name;
  // check if username is unique
  knex('users').where('email', email)
    .then(function(data){
      if(data.length) {
          return res.redirect('/register');
      } else {
        // hash and salt the password
        var hashedPassword = hashing(password);
        // if username is not in the database insert it
        knex('users').insert({
          name: name,
          email: email,
          password: hashedPassword
        }, '*')
        .then(function(data) {
          var user = {
            name: name,
            email: email,
            password: hashedPassword
          };
          var token = jwt.sign(user, process.env.api_auth, {
            expiresIn: 6000
          });
          res.json({
            user_id: data[0].id,
            name: name,
            email: email,
            token: token,
            message: "You've registered",
            status: "Success"
          });
        })
        .catch(function(err) {
          return res.send("wrong!");
        });
      }
    })
    .catch(function(err){
      return next(err);
    });
});
// Login with username and password
router.post('/login', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  console.log("Login route", req.body);
  knex('users').where('email', email)
      .then(function(data) {
        // username does not exist. return error.
        if (!data.length) {
          return res.send('Incorrect email.');
        }
        var user = data[0];
        // username found but do the passwords match?
        if (comparePassword(password, user.password)) {
          // passwords match! return user
          console.log("you're logged in");
          var token = jwt.sign(user, process.env.api_auth, {
            expiresIn: 6000
          });
          return res.send({
            token: token,
            name: user.name,
            email: user.email,
            user_id: user.id
          });
        } else {
          // passwords don't match! return error
          return res.json('Incorrect password.');
        }
      })
      .catch(function(err) {
        // issue with SQL/nex query
        return res.json('Incorrect username and/or password.');
      });
});

module.exports = router;