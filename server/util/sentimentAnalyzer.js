var request = require('request');
var sentimentController = require('../sentiment/sentimentController');
var config = require('config');
var spellChecker = require('./spellChecker');

var _apiKey = config.get('idol');
var _syncUrl = 'https://api.idolondemand.com/1/api/sync/analyzesentiment/v1';

function sentimentAnalyzer(comment, callback) {

  spellChecker(incorrectText, function(correctedSentence) {
    if (correctedSentence) {
      var queryString = generateQuery(correctedSentence);

      request(_syncUrl + queryString, function(err, response, body) {
        callback(JSON.parse(body));
      });
    } else {
      console.log('incorrect sentence', incorrectText, correctedSentence);
    }
  })

}

function generateQuery(text) {
  var queryString = '?text=';
  queryString += text.replace(/ /g, '+');
  queryString += ('&apikey=' + _apiKey);

  return queryString;
}

module.exports = sentimentAnalyzer;