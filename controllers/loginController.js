var User = require("../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;


const { body, validationResult } = require("express-validator");

// Display login form on GET.
exports.login_get = function (req, res, next) {
  res.render('log-in', { title: 'Log in to your MembersOnly account.' });
};

// Display login form on GET.
exports.login_post = function (req, res, next) {
  res.render('log-in', { title: 'Log in to your MembersOnly account.' });

  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            // passwords match! log user in
            return done(null, user);
          } else {
            // passwords do not match!
            //return done(null, false, { message: "Incorrect password" });
            res.render('log-in', { title: 'Log in to your MembersOnly account.', msg: 'Incorrect password' });
          }
        });
      });
    })
  );

  // save user.id in cookie/session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // user.id is used to find the user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.authenticate("local", {
    successRedirect: "/index",
    failureRedirect: "/index",
  })

};

