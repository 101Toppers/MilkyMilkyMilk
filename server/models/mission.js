var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoInc   = require('mongoose-sequence')(mongoose);

var Mission = new Schema({
  _id: { type: Number},
  name: { type: String},
  description: { type: String},
  has_audio: { type: Boolean},
  has_video: { type: Boolean},
  has_text: { type: Boolean},
  has_localization: { type: Boolean},
  group: { type: Boolean},
  created: {
    type: Date,
    default: Date.now
  }
});

Mission.plugin(autoInc, {id: "mission_id"});
module.exports = mongoose.model('mission', Mission);