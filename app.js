var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
var helpers = require('handlebars-helpers');
const favicon = require('express-favicon');
var app = express();
require('express-ws')(app);
var webscoket;
app.ws('/', function(ws, req) {
  webscoket = ws;
    ws.on('message', function(msg) {
      ws.send('Joe tet')
    });
    
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
helpers({handlebars: hbs})
hbs.registerPartials(__dirname + '/views/partials');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));

var bodyParser = require('body-parser');
var rawBodySaver = function (req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
}

app.use(bodyParser.json({ verify: rawBodySaver }));
app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
app.use(bodyParser.raw({ verify: rawBodySaver, type: function () { return true } }));

// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('index');
});
app.post('/', function (req, res){
  webscoket.send(JSON.stringify(req.headers, null, "  ") + "\n\n"+req.rawBody.toString())
  res.json('ok')
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

/*eslint-disable no-unused-vars */
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT || 4000);
