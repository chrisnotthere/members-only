require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
////
const session = require('express-session');
const passport = require("passport");
const bcrypt = require("bcryptjs");
var User = require("./models/user");
const LocalStrategy = require("passport-local").Strategy;
////

var indexRouter = require('./routes/index');
var signupRouter = require('./routes/sign-up');
var loginRouter = require('./routes/log-in');
var memberRouter = require('./routes/member');

app = express();

//Set up mongoose connection
var mongoose = require("mongoose");
var mongoDB = process.env.MONGODB;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

////
//setting up LocalStrategy, this is called by passport.authenticate()
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        console.log('--there was an error--');
        return done(err);
      }
      if (!user) {
        console.log('--incorrect username--');
        return done(null, false, { msg: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          console.log('--passwords match!--');
          return done(null, user);
        } else {
          // passwords do not match!
          console.log('--passwords do not match!--');
          return done(null, false, { msg: "Incorrect password" });
          //res.render('log-in', { title: 'Log in to your MembersOnly account.', msg: 'Incorrect password' });
        }
      });
    });
  })
);


// save user.id in cookie/session
passport.serializeUser(function (user, done) {
  console.log(`serialize user`);
  done(null, user.id);
});

// user.id is used to find the user
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    console.log(`deserialize user`);
    done(err, user);
  });
});
////

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// setting routes
app.use('/', indexRouter);
app.use('/sign-up', signupRouter);
app.use('/log-in', loginRouter);
app.use('/member', memberRouter);

////from auth basics
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
////

// TODO set this in /routes
app.get("/log-out", (req, res) => {
  req.logout();
  res.redirect("/");
});

//this allows us to access current user from within our views
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
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
