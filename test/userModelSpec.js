var User = require('../server/user/userModel');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var config = require('config');

mongoose.connect(config.get('mongo'));

describe("User Model Spec", function() {

  before(function(done) {
    User.remove({}, function() {
      done();
    })
  })

  it('should generate a password', function(done) {
    var testUser = {
      username: "test",
      email: "test@gmail.com",
      password: "password",
      business_name: "Starbucks"
    }
    User.create(testUser, function(err, createdUser) {
      expect(createdUser.password).to.not.eql('password');
      done();
    });
  });

  it('should increment app_number', function(done) {
    var testUser = {
      username: "test2",
      email: "test2@gmail.com",
      password: "password",
      business_name: "Starbucks"
    }
    var testUser2 = {
      username: "test3",
      email: "test3@gmail.com",
      password: "password",
      business_name: "Starbucks"
    }
    User.create(testUser, function(err, createdUser) {
      expect(createdUser.app_number).to.eql(1);

      User.create(testUser2, function(err, createdUser) {
        expect(createdUser.app_number).to.eql(2);
        done();
      });
    });
  });

});