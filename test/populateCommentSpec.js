var Comment = require('../server/comment/commentModel');
var mongoose = require('mongoose');
var config = require('config');
var expect = require('chai').expect;

mongoose.connect(config.get('mongo'));

describe('Comment Spec', function() {
  it('should have comments in DB', function(done) {
    Comment.find({}, function(err, foundComments) {
      console.log(foundComments);
      expect(foundComments).to.have.length.gt(0);
      done();
    });
  });
});