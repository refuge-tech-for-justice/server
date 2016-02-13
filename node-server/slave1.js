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
// var server = http.createServer(function (request, response) {
//   response.writeHead(200, {"Content-Type": "text/plain"});
//   response.end("Hello World\n");
// });


var sms = function(request, response) {
  console.log("IN: ", _.pick(request.body, ['From', 'Body']));
  command(request, response);
};
var app = express();
// app.use(cors);

// Listen on port 8000, IP defaults to 127.0.0.1
app.post('/sms', sms);

var server = app.listen(8071);

function enableCORSMiddleware (req,res,next) {
     // You could use * instead of the url below to allow any origin, 
     // but be careful, you're opening yourself up to all sorts of things!
     res.setHeader('Access-Control-Allow-Origin',  "http://localhost:8888");
     next()
}
server.use(enableCORSMiddleware);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");

module.exports=sms;

