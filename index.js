require('dotenv').config()

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.render('pages/index.html');
});

app.get('/weather', function(req, res) {
  var place = req.originalUrl.replace('/weather/', '')
  console.log(place)
  request({
    uri: 'http://api.openweathermap.org/data/2.5/weather?q=' + place + '&appid=' + process.env.OPENWEATHERMAP
  }).pipe(res);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
