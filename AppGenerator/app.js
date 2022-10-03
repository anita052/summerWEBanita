const createError = require('http-errors');
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const sql = require('./db');
const connection = require('./db');


var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var regisetRouter = require('./routes/register');
var searchRouter = require('./routes/search');

//set up app
var app = express();

app.use(express.static(path.join(__dirname, "public")));
app.set('views',path.join(__dirname,'views'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//refernce to page:rout+view
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', regisetRouter);
app.use('/search', searchRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.html');
});

module.exports = app;

