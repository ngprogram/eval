var sampleData = require('../../client/randomData');
var mongoose = require('mongoose');
var config = require('config');
mongoose.connect(config.get('mongo'));
var Comment = require('../comment/commentModel');

Comment.remove({}, function() {
  Comment.collection.insert(sampleData, function(err, insertedData) {
    console.log(insertedData);
  });
});
