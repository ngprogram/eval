var User = require('./userModel');
var mailController = require('../mail/mailController');

var userController = {};
userController.checkUsernameExists = checkUsernameExists;
userController.checkEmailExists = checkEmailExists;
userController.isLoggedIn = isLoggedIn;
userController.sendUser = sendUser;
userController.logout = logout;

function logout(req, res) {
  req.logout();
  res.redirect('/');
}

function sendUser(req, res) {
  res.send(req.user);
}

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
  // angular redirects
  res.send(200, 0);
};

module.exports = userController;