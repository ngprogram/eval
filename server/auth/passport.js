var passport = require('passport');
var User = require('../user/userModel');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  // console.log('user is being seriliazed');
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use('local-signup', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
    console.log('signup');
    var tempUser = req.body.tempUser
    User.create(tempUser, function(err, createdUser) {
      if (!err) {
        console.log('SUCCESS');
        done(null, createdUser);
      }
      if (err) {
        console.log("FAIL", err);
        done(err);
      }
    });
  }
));

passport.use('local-login', new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username}, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: 'Unknown user ' + username });
    }
    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        console.log('error', err);
        return done(err);
      }
      if(isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid password' });
      }
    });
  });
}));



module.exports = passport;