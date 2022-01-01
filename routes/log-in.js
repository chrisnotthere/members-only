var express = require('express');
var router = express.Router();
var login_controller = require('../controllers/loginController');
const passport = require("passport");

// GET login page
router.get('/', login_controller.login_get);

// POST login page - not working!
//router.post('/', login_controller.login_post);

//passport looks at request body for username and password and runs LocalStrategy to search db
//it then creates a session cookie we can access to see if a user is logged in
// TODO - import this from loginController
router.post('/', function(req, res, next) {
  
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { 
      //username/password not found
      return res.render('log-in', { title: 'Log in to your MembersOnly account.', msg: 'Username or Password incorrecta.' });
    }
    //login user
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      //success
      console.log('---login success---');
      res.locals.currentUser = req.user;
      app.locals.currentUser = req.user;  //save the user to app.locals, this can be accessed from anywhere in the app
      return res.render('index', { title: 'logged in!', user: req.user });
    });
  })(req, res, next);
});

// router.post('/', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/log-in',
//     //failureMessage: 'something went wrong!',
//   }));

module.exports = router;
