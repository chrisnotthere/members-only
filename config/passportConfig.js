const LocalStrategy = require("passport-local").Strategy;
//const passport = require("passport");
var User = require("../models/user");
const bcrypt = require("bcryptjs");

//setting up LocalStrategy
function initialize(passport) {

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
}

module.exports = initialize;