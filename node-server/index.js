var express = require('express');
var bodyParser = require('body-parser');
var twilio = require('twilio');
var firebase = require('firebase');
var _ = require('lodash');
var command = require('./command.js')
var config = require('./helpers/config');
var handle_error = require('./helpers/error_handler');
var utils = require('./helpers/utils');

var urls = utils.urls;
var http = require('http');

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));


var sms = function(request, response) {
  var twiml = new twilio.TwimlResponse()
  var sender = request.body['Sender'];
  var msg = request.body['Body'];
  console.log("IN: ", _.pick(request.body, ['From', 'Body']));
  command(request, response, sender);
}

app.post('/sms', twilio.webhook(config.TWILIO_AUTH_TOKEN), sms);



app.get('/', function(req, res) {
  res.send('Hello World!');
});

var server = app.listen(80, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Refuge listening at http://%s:%s', host, port);
});