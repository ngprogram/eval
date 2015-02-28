var request = require('request');
var config = require('config');
var spellChecker = require('./spellChecker');

var _apiKey = config.get('idol');
var _syncUrl = 'https://api.idolondemand.com/1/api/sync/analyzesentiment/v1';

function sentimentAnalyzer(comment, callback) {
  comment = removeSpecialWords(comment);
  spellChecker(comment, function(correctedComment) {
    if (correctedComment) {
      var queryString = generateQuery(correctedComment);
      request(_syncUrl + queryString, function(err, response, body) {
        callback(err, JSON.parse(body).aggregate.score);
      });
    } else {
      console.log('incorrect sentence', incorrectText, correctedComment);
    }
  })
}

function generateQuery(text) {
  var queryString = '?text=';
  queryString += text.replace(/ /g, '+');
  queryString += ('&apikey=' + _apiKey);

  return queryString;
}

function removeSpecialWords(text) {
  return text.replace(/very/ig, '');
}

module.exports = sentimentAnalyzer;