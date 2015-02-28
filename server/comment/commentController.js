var Comment = require('./commentModel');

var commentController = {};

commentController.saveComment = saveComment;
commentController.getComments = getComments;

function saveComment(comment, callback) {
  Comment.create(comment, callback);
}

function getComments(req, res) {
  var companyId = req.user.companyId;
  Comment.find({companyId: companyId}, function(err, foundComments) {
    if (err) {
      console.log('error getting comments', err);
    } else {
      res.send(foundComments);
    }
  });
}

module.exports = commentController;