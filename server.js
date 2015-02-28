var express = require('express');
var twilio = require('twilio');
var http = require('http');


var app = express();

var accountSid = 'ACc0698009482e61db3825a0ee37ce683a';
var authToken = "1d10ea3ddd05d4edfadc9e23b178026b";
var client = require('twilio')(accountSid, authToken);

app.get('/msg', function(req,res) {

  // if (req.body.getData) {

  // } 
  var twiml = new twilio.TwimlResponse();
  client.messages.list(function(err, data) {
    if (!err) {
      data.messages.forEach(function(message) {
        var commObj = {};
          var msg = message.body;
          if (msg.split(' ').length > 3) {
            if (typeof parseInt(msg[0],10) === 'number' && typeof msg[1] === 'string') {
              commObj.companyId = '' + msg[0];
              commObj.employee_name = msg[1];
              commObj.comment = msg.split(' ').slice(2);
              commObj.date = message.date_created;
              commObj.phone_number = message.from;
              twiml.say(message);
            }
          }
      }); 
        res.type('text/xml');
        res.send(twiml.toString());
    }
  });
});


var port = process.env.PORT || 8000;
console.log('Server listening on ' + port);

app.listen(port);



// client.messages.list(function(err, data) {
//   if (!err) {
//     console.log('alldata', data);
//     var commentArr = [];
//     data.messages.forEach(function(message) {
//       var commObj = {};
//         console.log(message.body);
//         var msg = message.body;
//         // comm.comment = 
//         // comm.employee_name = 
//     }); 
//   }
// });

//http://twimlets.com/echo?Twiml=%3CResponse%3E%3CSms%3EHello+Caroline%2C+thanks+for+the+message%21%3C%2FSms%3E%3C%2FResponse%3E
// http.createServer(function (req, res) {
//     // Create a TwiML response
//     var resp = new twilio.TwimlResponse();
 
//     // The TwiML response object will have functions on it that correspond
//     // to TwiML "verbs" and "nouns". This example uses the "Say" verb.
//     // Passing in a string argument sets the content of the XML tag.
//     // Passing in an object literal sets attributes on the XML tag.
//     resp.say({voice:'woman'}, 'ahoy hoy! Testing Twilio and node.js');
 
//     //Render the TwiML document using "toString"
//     res.writeHead(200, {
//         'Content-Type':'text/xml'
//     });
//     res.end(resp.toString());
 
// }).listen(8000);

//Send an SMS text message
// client.sendMessage({

//     to:'+14155345514', // Any number Twilio can deliver to
//     from: '+14157797191', // A number you bought from Twilio and can use for outbound communication
//     body: 'testing!' // body of the SMS message

// }, function(err, responseData) { //this function is executed when a response is received from Twilio

//     if (!err) { // "err" is an error received during the request, if any

//         // "responseData" is a JavaScript object containing data received from Twilio.
//         // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
//         // http://www.twilio.com/docs/api/rest/sending-sms#example-1

//         console.log(responseData.from); // outputs "+14506667788"
//         console.log(responseData.body); // outputs "word to your mother."

//     } else {
//       console.log(err);
//     }
// });


