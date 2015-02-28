var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
var sentimentAnalyzer = require('../util/sentimentAnalyzer');

// define message schema
var commentSchema = new Schema({
  companyId: {type: String, required: true}, //same as id from user
  comment: {type: String, required: true},
  employee_name: {type: String, default: null },
  phone_number: {type: String},
  date: {type: Date, required: true},
  score: {type: Number} // from sentiment anaylsis
});

commentSchema.pre('save', function(next) {
  var comment = this;
  comment.score = sentimentAnalyzer(comment.comment, function(err, score) {
    comment.score = score;
    next();
  })
});

module.exports = mongoose.model('Item', commentSchema);