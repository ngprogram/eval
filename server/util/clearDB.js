var TempUser = require('../user/tempUserModel');
var User = require('../user/userModel');
var mongoose = require('mongoose');
var config = require('config');
mongoose.connect(config.get('mongo'));

TempUser.remove({}, function() {
  User.remove({}, function() {
    console.log('database cleared');
    process.exit(0);
  });
});