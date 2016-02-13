var app = express();
var port = 8071;
var sms = function(request, response) {
  console.log('hi')
  }
app.post('/sms', sms)
app.listen(port)