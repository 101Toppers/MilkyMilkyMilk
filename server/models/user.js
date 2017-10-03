// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoInc   = require('mongoose-sequence')(mongoose);

var User = new Schema({
  _id: Number,
  name: String,
  mail: String,
  password: String
});

User.plugin(autoInc, {id: "user_id"});
module.exports = mongoose.model('users', User);