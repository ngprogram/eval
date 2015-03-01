var request      = require('supertest'),
    express      = require('express'),
    mongoose     = require('mongoose');

var expect = require('chai').expect;

var routeHandler = require('../../server/routeHandler');
var config = require('config');
var mongoose = require('mongoose');
var config = require('config');
mongoose.connect(config.get('mongo'));
var Comment = require('../../server/comment/commentModel');

var app = express();
var rand;

app.use('/comments', function(req, res, next) {
  req.user = {};
  req.user.companyId = 1234;
  next();
});
app.use(routeHandler);



describe('Local-Passport Specs', function() {

  this.timeout(3000);

  describe('Signup Spec', function () {
    it('should', function(done) {
      Comment.find({}, function(err, found) {
        console.log(found);
        done();
      });
    })


    xit('should signup a new user successfully', function(done) {
      request(app)
        .get('/comments')
        .expect(200)
        .end(function(err, res) {
          rand = res.body;
          done();
        });
    });
  });

});