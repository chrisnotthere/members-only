require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
////
const session = require('express-session');
const passport = require("passport");
const initializePassport = require('./config/passportConfig');
////

//Set up mongoose connection
var mongoose = require("mongoose");
var mongoDB = process.env.MONGODB;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var indexRouter = require('./routes/index');
var signupRouter = require('./routes/sign-up');
var loginRouter = require('./routes/log-in');
var memberRouter = require('./routes/member');
var adminRouter = require('./routes/admin');
var messageRouter = require('./routes/message');

app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

initializePassport(passport);

////from auth basics
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
////

////this allows us to access current user from within our views
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// setting routes
app.use('/', indexRouter);
app.use('/sign-up', signupRouter);
app.use('/log-in', loginRouter);
app.use('/member', memberRouter);
app.use('/admin', adminRouter);
app.use('/message', messageRouter);
// TODO set this in /routes
app.get("/log-out", (req, res) => {
  req.logout();
  res.redirect("/");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
