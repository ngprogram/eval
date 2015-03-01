var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//might want more info about business
var tempUserSchema = Schema({
  username: { type: String, required: true }, //make unique for testing
  email: {type: String, required: true }, //make unique for testing
  business_name: {type: String, required: true},
  password: {type: String, required: true},
  createdAt: {type: Date, expires: 3600, default: Date.now()}, //expires after 3600 seconds
  rand: {type: Number, required: true}
});

module.exports = mongoose.model('TempUser', tempUserSchema);
