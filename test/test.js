var request      = require('supertest'),
    express      = require('express'),
    mongoose     = require('mongoose');

var expect = require('chai').expect;

var config = require('config');

var app = express();
var User = require('../server/user/userModel');
var TempUser = require('../server/user/tempUserModel');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('../server/auth/passport');


var rand;
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
  secret: 'secretttt',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/signup', passport.authenticate('local-signup'));

describe('Local-Passport Specs', function() {

  describe('Login Spec', function() {
    it('should login into a current user successfully', function(done) {
      request(app)
        .post('/signup')
        .send({ username: 'test', password: 'hackreactor'})
        .expect(200)
        .end(function(err, res) {
          expect(res.body.username).to.eql('test');
          done();
        })
    });


    xit('should return error if attempting to login with incorrect password', function(done) {
      request(app)
        .post('/login')
        .send({ username: 'test', password: 'wrong'})
        .expect(401, done);
    });

  });

});