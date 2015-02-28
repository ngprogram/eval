var sentimentAnalyzer = require('../server/util/sentimentAnalyzer');
var expect = require('chai').expect;

describe('Sentiment Analyzer', function() {
  it('should return a corrected comment', function(done) {
    var comment = "that was great";
    sentimentAnalyzer(comment, function(err, score) {
      expect(score).to.exist;
      expect(score).to.be.gte(0);
      done();
    });
  });
});