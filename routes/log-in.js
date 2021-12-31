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
// router.post(
//   "/",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/log-in"
//   })
// );

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/log-in'); }
    
    //login user
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      //success
      //return res.redirect('/', { user });
      return res.render('index', { title: 'You have successfully logged in!', user });

    });

  })(req, res, next);
});

module.exports = router;
