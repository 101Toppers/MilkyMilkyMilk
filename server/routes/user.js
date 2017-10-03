var express = require('express');
var router = express.Router();
var bcrypt  = require('bcryptjs');


var User = require('../models/user.js');

//Index
router.get('/', function(req, res) {
  User.find({}, function(err, usuarios) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(usuarios);
    }
  });
});

//Create
router.post('/register', function(req, res) {
  var user      = new User();
  user.name       = req.body.name;
  user.mail      = req.body.mail;

  bcrypt.hash(req.body.password, 10, function(err, hash) {
    if (err) {
      res.status(400).send(err);
    } else {
      user.password = hash;
      user.save(function(err) {
        if (err) {
          if (err.name === 'MongoError' && err.code === 11000) {
                // Duplicate username
                console.log(err);
                return res.status(400).send('Usuário já existente.');
              }
              // Some other error
              return res.status(400).send(err);
        } else {
          res.status(200).send(user.id);
        }
      });
    }
  });
});

// Update
router.post('/update/:user_id', function(req, res) {
  User.findById(req.params.user_id, function(err, user) {
    if (req.body.name) user.name = req.body.name;
    if (req.body.mail) user.mail = req.body.mail;
    if (req.body.password) {
      bcrypt.hash(req.body.password, 10, function(err, hash) {
        user.password = hash;
        user.save(function(err) {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(200).send("Usuário atualizado.");
          }
        });
      });
    } else {
      user.save(function(err) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).send("Usuário atualizado.");
        }
      });
    }
  });
});

//Auth
router.post('/login', function(req, res) {
  User.findOne({'mail': req.body.email}, function(error, user) {
    if (!user) {
      res.status(400).send('Usuário não encontrado.');
    } else {
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        if (err) {
          res.status(400).send(err);
        } else {
          if (result) {
            res.status(200).json(user);
          } else {
            res.status(400).json('Senha incorreta.');
          }
        }
      });
    }
    
  });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

router.get('/status', function(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true
  });
});

router.get('/users', function(req, res) {
  var user_name = req.query.username;
  User.find({mail: user_name}, function (err, user) {
        if (err != null){
            console.log(err);
        }
        res.json(user);
  });
});

module.exports = router;