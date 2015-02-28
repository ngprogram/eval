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

// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use('local-login', new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
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
        console.log('match found');
        return done(null, user);
      } else {
        console.log('no matches were found');
        return done(null, false, { message: 'Invalid password' });
      }
    });
  });
}));

passport.use('local-signup', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
    var email = req.body.email;
    var business_name = req.body.business_name;
    User.create({username: username, password: password, email: email, business_name: business_name}, function(err, createdUser) {
      if (!err) {
        done(null, createdUser);
      }
    });
  }
));

module.exports = passport;