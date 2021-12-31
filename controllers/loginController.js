var User = require("../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const { body, validationResult } = require("express-validator");

// Display login form on GET.
exports.login_get = function (req, res, next) {
  res.render('log-in', { title: 'Log in to your MembersOnly account.' });
};

// // Display login form on GET. ***currently this does not get called...***
// exports.login_post = function (req, res, next) {

//   console.log('login POST');
//   //res.render('log-in', { title: 'Log in to your MembersOnly account.', msg: `${req.body.username} ${req.body.password}` });

//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/log-in",
//   });

// }
