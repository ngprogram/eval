var Comment = require('./commentModel');

var commentController = {};

commentController.saveComment = saveComment;
commentController.getComments = getComments;

function saveComment(comment, callback) {
  Comment.create(comment, callback);
}

function getComments(req, res) {
  var companyId = req.user.companyId;
  console.log('getting');
  console.log(companyId);
  Comment.find({}, function(err, foundComments) {
    console.log('found');
    console.log(foundComments);
    if (err) {
      console.log('error getting comments', err);
      res.send(200, []);
    } else {
      res.send(200, foundComments);
    }
  });
}

module.exports = commentController;