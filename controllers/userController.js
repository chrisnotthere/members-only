//var async = require("async");
var User = require("../models/user");

const { body, validationResult } = require("express-validator");

// Display user create form on GET.
exports.user_create_get = function (req, res, next) {
    res.render('sign-up', { title: 'Create an new new account', error: false });
  };

// Handle user create on POST.
exports.user_create_post = [
    // Validate and sanitize fields.
    body("username")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Name must be specified."),
    body("password")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Password must be specified."),
    body("avatar")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Avatar must be specified."),
    body("status")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Status must be specified."),
  
    // Process request after validation and sanitization.
    (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/errors messages.
        console.log(errors);
        res.render("sign-up", {
          title: "Create a new account",
          user: req.body,
          errors: errors.array(),
        });
        return;
      } else {
        // Data from form is valid.
  
        // Create a user object with escaped and trimmed data.
        var user = new User({
          username: req.body.username,
          password: req.body.password,
          avatar: req.body.avatar,
          status: req.body.status,
        });
        user.save(function (err) {
          if (err) {
            return next(err);
          }
          // Successful - redirect to home page
          res.redirect('/');
        });
      }
    },
  ];