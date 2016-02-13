var express = require('express');
var bodyParser = require('body-parser');
var twilio = require('twilio');
var firebase = require('firebase');
var _ = require('lodash');
var config = require('../node-server/helpers/config');


var sms = function(request, response) {
  console.log("IN: ", _.pick(request.body, ['From', 'Body']));
  var twiml = new twilio.TwimlResponse();
  var sender = request.body['From'];
  var msg = request.body['Body'];

  response.send(twiml.message('HEY')); 

};


var app = express();
var port = process.env.PORT || 8071;

app.post('/sms', twilio.webhook(config.TWILIO_AUTH_TOKEN), sms);
app.listen(port);

console.log('Server started! At http://localhost:' + port);