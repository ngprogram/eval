var commentController = require('../../server/comment/commentController');
var expect = require('chai').expect;
var Comment = require('../../server/comment/commentModel');

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