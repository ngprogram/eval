var commentController = require('../server/comment/commentController');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var config = require('config');
var Comment = require('../server/comment/commentModel');

mongoose.connect(config.get('mongo'));

describe('CommentController Spec', function() {
  it('should save a comment', function(done) {
    var testComment = {
      companyId: 45,
      comment: 'very good',
      employee_name: 'Bob',
      phone_number: "test number",
    }
    commentController.saveComment(testComment, function(err, createdComment) {
      expect(createdComment.score).to.be.gt(0);
      done();
    });
  });
});