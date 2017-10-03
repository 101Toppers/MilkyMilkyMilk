var express = require('express');
var router = express.Router();
var bcrypt  = require('bcryptjs');


var MissionAnswer = require('../models/mission_answer.js');

//Index
router.get('/', function(req, res) {
  MissionAnswer.find({}, function(err, missions) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(missions);
    }
  });
});

//Create
router.post('/', function(req, res) {
  var mission              = new MissionAnswer();
  mission.name             = req.body.name;
  mission.description      = req.body.description;
  mission.has_audio        = req.body.has_audio;
  mission.has_video        = req.body.has_video;
  mission.has_text         = req.body.has_text;
  mission.has_localization = req.body.has_localization;

  mission.save(function(err) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(mission._id);
    }
  });
});

// Update
router.put('/:mission_id', function(req, res) {
  MissionAnswer.findById(req.params.mission_id, function(err, mission) {
    if (req.body.name) mission.name                         = req.body.name;
    if (req.body.description) mission.description           = req.body.description;
    if (req.body.has_audio) mission.has_audio               = req.body.has_audio;
    if (req.body.has_video) mission.has_video               = req.body.has_video;
    if (req.body.has_text) mission.has_text                 = req.body.has_text;
    if (req.body.has_localization) mission.has_localization = req.body.has_localization;
    
    mission.save(function(err) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(mission._id);
      }
    });
  });
});

// Delete
router.delete('/:mission_id', function(req, res) {
  MissionAnswer.remove({ _id: req.params.mission_id }, function(err) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send("Missão removida.");
    }
  });
});

router.get('/missions', function(req, res) {
  var mission_name = req.query.missionname;
  MissionAnswer.find({mail: mission_name}, function (err, mission) {
        if (err != null){
            console.log(err); 
        }
        res.json(mission);
  });
});

module.exports = router;