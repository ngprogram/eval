var User = require('./userModel');

var userController = {};
userController.checkUsernameExists = checkUsernameExists;
userController.checkEmailExists = checkEmailExists;
userController.isLoggedIn = isLoggedIn;

function checkUsernameExists(req, res) {
  var username = req.body.username;
  var alreadyExisting = {};
  alreadyExisting.alreadyExisting = true;
  User.findOne({username: username}, function(err, foundUser) {
    if (!foundUser) {
      alreadyExisting.alreadyExisting = false;
    }
    res.send(alreadyExisting);
  });
}

function checkEmailExists(req, res) {
  var email = req.body.email;
  var alreadyExisting = {};
  alreadyExisting.alreadyExisting = true;
  User.findOne({email: email}, function(err, foundEmail) {
    if (!foundEmail) {
      alreadyExisting.alreadyExisting = false;
    }
    res.send(alreadyExisting);
  });
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send([]);
};

module.exports = userController;