// Load the http module to create an http server.
var express = require('express');
var bodyParser = require('body-parser');
var twilio = require('twilio');
var firebase = require('firebase');
var _ = require('lodash');
var config = require('../node-server/helpers/config');
var command = require('./command.js');
var http = require('http');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World\n");
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8071);
server.post('/sms', twilio.webhook(config.TWILIO_AUTH_TOKEN), sms);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");