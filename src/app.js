var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname));

// API path
var sb = require('./routes/sb');
app.use('/sb', sb);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

if (app.get('env') != 'development'){
  // For client
  app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
  });
}

// catch 404 and forward to error handler
app.use(function(req, res, next){
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// for heroku
var port = process.env.PORT;

if (app.get('env') == 'development'){
  port = port || 3000;
  app.listen(port, function () {
    console.log('Example listening on port ' + port + '!');
  });
}else{
  port = port || 8080;
  app.listen(port, function () {
    console.log('Example listening on port ' + port + '!');
  });
}

module.exports = app;