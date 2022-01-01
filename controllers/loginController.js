const passport = require("passport");

// Display login form on GET.
exports.login_get = function (req, res, next) {
  res.render('log-in', { title: 'Log in to your MembersOnly account.' });
};

//passport looks at request body for username and password and runs LocalStrategy (in /config/passportConfig) to search db
//it then creates a session cookie we can access to see if a user is logged in
exports.login_post = function(req, res, next) {
  
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { 
      //username/password combo not found
      return res.render('log-in', { title: 'Log in to your MembersOnly account.', msg: 'Username or Password incorrect.' });
    }
    //login user
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      //success
      console.log('---login success---');
      //save the user to app.locals, this can be accessed from anywhere in the app
      app.locals.currentUser = req.user;  
      return res.redirect('/')
      //return res.render('index', { title: 'logged in!' });
    });
  })(req, res, next);
};
