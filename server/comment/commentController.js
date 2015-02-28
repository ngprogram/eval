var Comment = require('./commentModel');

var commentController = {};

commentController.saveComment = saveComment;
commentController.getCommentByCompanyId = getCommentByCompanyId;

function saveComment(comment, callback) {
  console.log('saving',comment);
  Comment.create(comment, callback);
}

function getCommentByCompanyId(companyId, callback) {
  Comment.find({companyId: companyId}, callback);
} 

module.exports = commentController;