var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoInc   = require('mongoose-sequence')(mongoose);

var MissionAnswer = new Schema({
  _id: { type: Number},
  _user: { type: Number, ref: './user.js' },
  _mission: { type: Number, ref: './mission.js' },
  _group: { type: Number},
  audio: { type: String},
  video: { type: String},
  text: { type: String},
  geolocalization: { type: String},
  created: {
    type: Date,
    default: Date.now
  }
});

MissionAnswer.plugin(autoInc, {id: "answer_id"});
module.exports = mongoose.model('mission_answer', MissionAnswer);