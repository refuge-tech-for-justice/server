var express = require('express');
var bodyParser = require('body-parser');
var twilio = require('twilio');
var firebase = require('firebase');
var _ = require('lodash');
var app = express();
var port = process.env.PORT || 8071;
var config = require('../node-server/helpers/config');
app.listen(port);
console.log('Server started! At http://localhost:' + port);

var sms = function(request, response) {
  console.log("IN: ", _.pick(request.body, ['From', 'Body']));
  var twiml = new twilio.TwimlResponse();
  var sender = request.body['From'];
  var msg = request.body['Body'];

  response.send(twiml.message('HEY')); 

};

app.post('/sms', twilio.webhook(config.TWILIO_AUTH_TOKEN), sms);
