var request      = require('supertest'),
    express      = require('express'),
    mongoose     = require('mongoose');

var expect = require('chai').expect;

var routeHandler = require('../../server/routeHandler');
var config = require('config');

var app = express();
var rand;
app.use(routeHandler);

describe('Local-Passport Specs', function() {

  this.timeout(3000);

  describe('Signup Spec', function () {
    it('should signup a new user successfully', function(done) {
      request(app)
        .post('/signup')
        .send({username: 'test', business_name: "Starbucks", email: 'test@hotmail.com', password: 'hackreactor'})
        .expect(200)
        .end(function(err, res) {
          rand = res.body;
          done();
        });
    });

    it('should return error if attempting to signup with a used email', function(done) {
      request(app)
        .post('/signup')
        .send({username: 'test', business_name: 'Starbucks', email: 'test@hotmail.com', password: 'hackreactor'})
        .expect(401, done);
    });
  });

  describe('Verify Spec', function() {
    it('should redirect to dashboard if usr is created successfully', function(done) {
      request(app)
        .get('/verify?id=' + rand)
        .end(function(err, res) {
          expect(res.header['location']).to.eql('/#/dashboard')
          done();
        })
    });

    it('should redirect if verify hash is incorrect', function(done) {
      request(app)
        .get('/verify?id=' +0)
        .end(function(err, res) {
          expect(res.header['location']).to.eql('/')
          done();
        })
    });
  });

  describe('Login Spec', function() {
    xit('should login into a current user successfully', function(done) {
      request(app)
        .post('/login')
        .send({ email: 'test@hotmail.com', password: 'hackreactor'})
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.eql('test');
          done();
        })
    });


    it('should return error if attempting to login with incorrect password', function(done) {
      request(app)
        .post('/login')
        .send({ email: 'test@hotmail.com', password: 'wrong'})
        .expect(401, done);
    });

  });

});